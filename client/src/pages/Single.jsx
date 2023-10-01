import React from 'react'
import Edit from '../assets/img/edit.png'
import Delete from '../assets/img/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div className="user">
          <img src="https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=3" alt="" />
          <div className="info">
            <span>Juan</span>
            <p>Posteado hace 2 días</p>
          </div>
          <div className="edit">
            <Link to="/write?edit=2">
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sequi autem similique cum nihil quos porro culpa commodi molestiae nobis, tenetur sed quibusdam optio? Neque sed aliquam sint in molestias!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid saepe omnis, quo numquam excepturi iure distinctio eum expedita optio, cum, cumque eius quasi aperiam nulla explicabo labore impedit corrupti nihil.</p>
      </div>
      <Menu />
    </div>
  )
}

export default Single