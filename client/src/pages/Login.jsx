import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login(inputs);
        
      if (response && response.data) {
        navigate('/');
      } else {
        setError('Error de inicio de sesión');
      }
    } catch (error) {
      setError(error.message || 'Error de inicio de sesión');
    }
  }
  
  return (
    <div className='auth'>
        <h1>Inicio de Sesión</h1>
        <form action="">
            <input type="text" placeholder='Usuario' name="username" onChange={handleChange} />
            <input type="password" placeholder='Contraseña' name="password" onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            {error && <p>{error}</p>}
            <span>No tienes una cuenta? <Link to="/register">Regístrate</Link></span>
        </form>
    </div>
  )
}

export default Login