import React, { useContext } from 'react'
import Logo from '../assets/img/logo.jpg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <Link to="/"><img src={Logo} alt="" /></Link>
            </div>
            <div className="links">
                <Link className='link' to="/?categoria=arte"><h6>ARTE</h6></Link>
                <Link className='link' to="/?categoria=ciencia"><h6>CIENCIA</h6></Link>
                <Link className='link' to="/?categoria=tecnologia"><h6>TECNOLOGÍA</h6></Link>
                <Link className='link' to="/?categoria=cine"><h6>CINE</h6></Link>
                <Link className='link' to="/?categoria=disenio"><h6>DISEÑO</h6></Link>
                <Link className='link' to="/?categoria=comida"><h6>COMIDA</h6></Link>
                <span>{currentUser && currentUser.username}</span>
                {currentUser ? <span onClick={logout}>Cerrar Sesión</span> : <Link className='link' to="/login">Login</Link>}
                <span className='write'>
                    <Link className='link' to="/write">Escribir</Link>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Navbar