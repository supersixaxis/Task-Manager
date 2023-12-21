import React from 'react'

export default function Task({ task, deleteTask }) {
  return (
    <div key={task.id} className='taskContainer'> 
          <p key={task.id}>{task.title}</p>
          <button className='taskButton' onClick={deleteTask}>X</button>
    </div>
  )
}
