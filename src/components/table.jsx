import React, { useState } from 'react';
import Task from './Task';
import EditTableTitleForm from './EditTableTitleForm';
import FormAddTask from './FormAddTask';
export default function Table({ table, tasks, deleteTask, onTaskDrop, onDragStart, editTask, editTableTitle, addTaskTable }) {
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

    if (droppedTask) {
      onTaskDrop(droppedTask, table.id);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="table" onDrop={handleDrop} onDragOver={allowDrop} onClick={handleClick}>
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