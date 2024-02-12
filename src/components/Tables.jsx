import React, {useEffect} from 'react'
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { store } from '../redux/store';
import { setTables } from '../redux/table/TableSlice'
import { setTasks } from '../redux/task/TaskSlice'
function Tables() {
  const tablesList = useSelector((state) => state.table.tablesList);
  const tasks = useSelector((state) => state.task.taskList);
  let { id } = useParams();
  const filteredTables = tablesList.filter((table) => table.spaceId === parseInt(id));
  const navigate = useNavigate()
  useEffect(()=>{
    let connected = sessionStorage.getItem('connected') === 'true'

    if(!connected){
      return navigate('/login')
    }

    let tablesStorage = localStorage.getItem('tables')
    let tasksStorage = localStorage.getItem('tasks')
    if(tablesStorage !== null && tablesStorage !== ''){
        let dataTable = JSON.parse(tablesStorage)
        store.dispatch(setTables(dataTable))
    } else {
      localStorage.setItem('tables', JSON.stringify(tablesList));
    }
    if(tasksStorage !== null && tasksStorage !== ''){
      let dataTask = JSON.parse(tasksStorage)
      store.dispatch(setTasks(dataTask))
  } else {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}, [])
  return (
    <div className="tablesContainer">
      <AddTableForm spaceId={id} />
      <SelectTableDelete  tables={filteredTables} />
      <div className="tablesListContainer">
      {filteredTables.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((table, index) => (
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
