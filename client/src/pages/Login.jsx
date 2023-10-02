import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate('http://localhost:8800/api/');
    } catch (error) {
      setError(error.response.data);
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