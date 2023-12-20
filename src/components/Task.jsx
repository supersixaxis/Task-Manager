import React from 'react'

export default function Task({ task }) {
  return (
    <div key={task.id} className='taskContainer'> 
          <p key={task.id}>{task.title}</p>
          <button className='taskButton'>X</button>
    </div>
  )
}
