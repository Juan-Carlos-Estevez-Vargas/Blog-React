import React from 'react'
import Logo from '../assets/img/logo.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="links">
                <Link className='link' to="/?categoria=arte">
                    <h6>ARTE</h6>
                </Link>
                <Link className='link' to="/?categoria=ciencia">
                    <h6>CIENCIA</h6>
                </Link>
                <Link className='link' to="/?categoria=tecnologia">
                    <h6>TECNOLOGÍA</h6>
                </Link>
                <Link className='link' to="/?categoria=cine">
                    <h6>CINE</h6>
                </Link>
                <Link className='link' to="/?categoria=disenio">
                    <h6>DISEÑO</h6>
                </Link>
                <Link className='link' to="/?categoria=comida">
                    <h6>COMIDA</h6>
                </Link>
                <span>Juan</span>
                <span>Cerrar Sesión</span>
                <span className='write'>
                    <Link className='link' to="/write">Escribir</Link>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Navbar