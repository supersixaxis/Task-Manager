import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {

  const navigate = useNavigate()

  useEffect(()=>{
    let connected = localStorage.getItem('connected')

    if(!connected){
      return navigate('/login')
    }
  }, [])
  return (
    <div>
        <Link to="/login" className="btnNav">Login</Link>
        <Link to="/spacelist" className="btnNav">Espace de travail</Link>
      <h1>Page d'accueil</h1>
    </div>
  )
}
