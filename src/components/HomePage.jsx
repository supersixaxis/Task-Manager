import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {

    let connected = localStorage.getItem('connected')
    if(!connected){
        return useNavigate('/login')
    }
  return (
    <div>
        <Link to="/login" className="btnNav">Login</Link>
        <Link to="/tasklist" className="btnNav">Liste de tâches</Link>
      <h1>Page d'accueil</h1>
    </div>
  )
}
