import React, { useState } from 'react';
import EditTaskForm from './EditTaskForm';

export default function Task({ task, deleteTask, onDragStart, editTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDragStart = (e) => {
    onDragStart(e, task);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleEditComplete = (editedTitle) => {
    editTask(task.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="taskContainer"
      onClick={(e)=>{
        e.stopPropagation()
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <EditTaskForm
          taskId={task.id}
          initialTitle={task.title}
          onEditComplete={handleEditComplete}
          editTask={editTask}
        />
      ) : (
        <>
          <p key={task.id}>{task.title}</p>
          <button className="taskButton" onClick={() => deleteTask(task.id)}>
            X
          </button>
        </>
      )}
    </div>
  );
}