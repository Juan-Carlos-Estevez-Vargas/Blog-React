import React, { useContext, useEffect, useRef, useState } from 'react'
import Edit from '../assets/img/edit.png'
import Delete from '../assets/img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import { API_BASE_URL } from '../../config.js';

const Single = () => {
  const postRef = useRef();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const id = location.pathname.split("/")[2];
      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
        postRef.current = response.data[0];
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [location.pathname]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  const post = postRef.current;
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  if (!post) {
    return <div>No hay datos para mostrar.</div>;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../uploads/${post?.img}`} alt="" />
        <div className="user">
          {post?.userImg && <img src={post?.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posteado hace {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.other.username === post.username && <div className="edit">
            <Link to="/write?edit=2" state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h1>{getText(post.title)}</h1>
        {getText(post.description)}
      </div>
      <Menu category={post.category} />
    </div>
  )
}

export default Single