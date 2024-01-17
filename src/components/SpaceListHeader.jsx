import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/space.css';
export default function SpaceListHeader() {
  return (
    <div className='spaceListHeaderContainer'>
      <h1>Vos espaces de travail</h1>
      <Link to="/" className="btnNav">Page d'acceuil</Link>
    </div>
  )
}
