import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='auth'>
        <h1>Registro</h1>
        <form action="">
            <input required type="text" placeholder='Usuario' />
            <input required type="email" placeholder='Correo' />
            <input required type="password" placeholder='Contraseña' />
            <button>Register</button>
            <p>Esto es un error</p>
            <span>Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></span>
        </form>
    </div>
  )
}

export default Register