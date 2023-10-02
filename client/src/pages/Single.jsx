import React, { useContext, useEffect, useState } from 'react'
import Edit from '../assets/img/edit.png'
import Delete from '../assets/img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const id = location.pathname.split("/")[2];
      try {
        const response = await axios.get(`http://localhost:8800/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${post.id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

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
            <img onClick={handleDelete} src={Delete} alt="" />
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