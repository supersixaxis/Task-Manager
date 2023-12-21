// Table.jsx
import React from 'react';
import Task from './Task';

export default function Table({ table, tasks, deleteTask, onTaskDrop, onDragStart }) {
  const tasksForTable = tasks.filter((task) => task.tableId === table.id);

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
    <div
      className="table"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      <p>{table.title}</p>

      {tasksForTable.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={() => deleteTask(task.id)}
          onDragStart={(e) => onDragStart(e, task)}
        />
      ))}
    </div>
  );
}
