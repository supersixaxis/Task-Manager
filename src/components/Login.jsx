import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  return (
    <div>
        <form onSubmit={(e) => {
            e.preventDefault()

            if(email.trim().lenght === 0 || password.trim().lenght === 0){
                alert('Veuillez saisir un email et un mot de passe')
            }
            if (email === 'nath@live.fr' && password === '0000'){
                sessionStorage.setItem('connected', true)
                return navigate('/')
            } else alert('Identifiant ou mot de passe incorrect')
        }}>
        <div>
            <label htmlFor="">login</label>
            <input type="text" value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}/>
        </div>

        <div>
            <label htmlFor="">password</label>
            <input type="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}/>
        </div>
        <button type='submit'>Connexion</button>
        </form>
      <h1>Connexion</h1>
      <p>Identifiant test : nath@live.fr</p>
      <p>Password test : 0000</p>
    </div>
  )
}
