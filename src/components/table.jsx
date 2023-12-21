import '../styles/tables.css'
import Task from './Task';
export default function Table({table, tasks, deleteTask }) {
  const tasksForTable = tasks.filter((task) => task.tableId === table.id);
  return (
    <div className="table">
        <p>{table.title}</p>
        
        {tasksForTable.map((task) => (
          <Task key={task.id} task={task} deleteTask={() => deleteTask(task.id)}/>
        )) } 
        
    </div>
  )
}