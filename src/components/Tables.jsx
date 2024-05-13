import React, {useEffect} from 'react'
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { setTables } from '../redux/table/TableSlice'
import { setTasks } from '../redux/task/TaskSlice'
import { getTables } from '../api/TableApi.js'
import { getTasks } from '../api/TaskApi.js'
function Tables() {
  const tables = useSelector((state) => state.table.tablesList);
  const tasks = useSelector((state) => state.task.taskList);
  let { id } = useParams();
 // const tablesFiltered = tables.filter((table) => table.spaceId === parseInt(id));
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(()=>{
    let connected = sessionStorage.getItem('connected') === 'true'

    if(!connected){
      return navigate('/login')
    }

    const fetchTables = async () => {
        let tables = await getTables()
        dispatch(setTables(tables))
    
    }
    fetchTables()

    const fetchTasks = async () => {
        let tasks = await getTasks()
        dispatch(setTasks(tasks))

    }
    fetchTasks()
}, [])

const filterTables = (id_space, tables) => {
  return [...tables].filter(table => table.spaceId.toString() === id_space.toString())
}

let tablesFiltered = filterTables(id, tables)

  return (
    <div className="tablesContainer">
      <AddTableForm spaceId={id} />
      <SelectTableDelete  tables={tablesFiltered} />
      <div className="tablesListContainer">
      {tablesFiltered.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((table, index) => (
       <Table
       key={index}
       table={table}
       tasks={tasks}
       onDragStart={(e, task) => {
         e.dataTransfer.setData('taskId', task.id);   
       }}
          />
        ))}
      </div>
    </div>
  );
}

export default Tables;
