import React, { useState } from 'react';
import Task from './Task';
import EditTableTitleForm from './EditTableTitleForm';
import FormAddTask from './FormAddTask';
export default function Table({ table, tasks, deleteTask, onTaskDrop, onDragStart, editTask, editTableTitle, addTaskTable, moveTable }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const tasksForTable = tasks.filter((task) => task.tableId === table.id);

  const handleClick = (e) => {
    if (e.target.className === 'tableTitle') {
      setIsEditingTitle(true);
    }
  };

  const handleEditTitleComplete = (newTitle) => {
    editTableTitle(table.id, newTitle);
    setIsEditingTitle(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData('taskId');
    const droppedTask = tasks.find((task) => task.id === taskId);
    let id_table_drag = e.dataTransfer.getData('id_table_drag')
    const order_table_drag = e.dataTransfer.getData('order_table_drag')
    if (droppedTask) {
      onTaskDrop(droppedTask, table.id);
    }else if(id_table_drag){
      // J'ai droppé un tableau
      moveTable(id_table_drag, order_table_drag, table.id, table.order)
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="table" draggable="true"
    onDragStart={(e)=>{
      e.dataTransfer.setData('id_table_drag', table.id)
      e.dataTransfer.setData('order_table_drag', table.order)
    }} 
    onDrop={handleDrop} onDragOver={allowDrop} onClick={handleClick}>
      {isEditingTitle ? (
        <EditTableTitleForm
          tableId={table.id}
          initialTitle={table.title}
          onEditComplete={handleEditTitleComplete}
        />
      ) : (
        <p className="tableTitle">{table.title}</p>
      )}

      {tasksForTable.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={() => deleteTask(task.id)}
          onDragStart={(e) => onDragStart(e, task)}
          editTask={editTask}
        />
      ))}
      <FormAddTask addTaskTable={addTaskTable} tableId={table.id} />
    </div>
  );
}