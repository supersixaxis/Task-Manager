
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import { useSelector } from 'react-redux';
function Tables() {
  const tablesList = useSelector((state) => state.table.tablesList);
  const tasks = useSelector((state) => state.task.taskList);

  return (
    <div className="tablesContainer">
      <AddTableForm />
      <SelectTableDelete  tables={tablesList} />
      <div className="tablesListContainer">
      {tablesList.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((table, index) => (
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
