import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='auth'>
        <h1>Inicio de Sesión</h1>
        <form action="">
            <input type="text" placeholder='Usuario' />
            <input type="password" placeholder='Contraseña' />
            <button>Login</button>
            <p>Esto es un error</p>
            <span>No tienes una cuenta? <Link to="/register">Regístrate</Link></span>
        </form>
    </div>
  )
}

export default Login