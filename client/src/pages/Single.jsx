import React, { useContext, useEffect, useState } from 'react'
import Edit from '../assets/img/edit.png'
import Delete from '../assets/img/delete.png'
import { Link, useLocation } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const id = location.pathname.split("/")[2];
      try {
        const response = await axios.get(`http://localhost:8800/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        
      }
    }
    fetchData();
  }, []);

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posteado hace {moment(post.date).fromNow()}</p>
          </div>
          {currentUser .username === post.username && <div className="edit">
            <Link to="/write?edit=2">
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        {post.description}
      </div>
      <Menu />
    </div>
  )
}

export default Single