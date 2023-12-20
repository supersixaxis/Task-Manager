import React from 'react'
import {Link} from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
        <Link to="/login" className="btnNav">Login</Link>
        <Link to="/tasklist" className="btnNav">Liste de tâches</Link>
      <h1>Page d'accueil</h1>
    </div>
  )
}
