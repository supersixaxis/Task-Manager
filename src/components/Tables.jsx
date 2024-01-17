
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Tables() {
  const tablesList = useSelector((state) => state.table.tablesList);
  const tasks = useSelector((state) => state.task.taskList);
  let { id } = useParams();
  const filteredTables = tablesList.filter((table) => table.spaceId === parseInt(id));
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
