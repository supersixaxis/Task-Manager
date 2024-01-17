import React from 'react'
import '../styles/space.css';

export default function Space({space}) {
  return (
    <div className='spaceCard'>
      <p>{space.title}</p>
    </div>
  )
}
