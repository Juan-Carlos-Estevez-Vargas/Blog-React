import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8800/api/auth/register', inputs);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error(error.response);
        setError(error.response.data);
      } else if (error.request) {
        console.error(error.request);
        setError(error.request);
      } else {
        console.error('Error', error.message);
        setError(error.message);
      }
    }
  }

  return (
    <div className='auth'>
        <h1>Registro</h1>
        <form action="">
            <input required type="text" placeholder='Usuario' name ="username" onChange={handleChange} />
            <input required type="email" placeholder='Correo' name ="email" onChange={handleChange} />
            <input required type="password" placeholder='Contraseña' name ="password" onChange={handleChange} />
            <button onClick={handleSubmit}>Register</button>
            {error && <p>{error.message}</p>}
            <span>Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></span>
        </form>
    </div>
  )
}

export default Register