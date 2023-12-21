import React from 'react'

export default function Task({ task, deleteTask, onDragStart  }) {
  
  const handleDragStart = (e) => {
    onDragStart(e, task);
  };
  return (
    
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="taskContainer"
    >
          <p key={task.id}>{task.title}</p>
          <button className='taskButton' onClick={deleteTask}>X</button>
    </div>
  )
}
