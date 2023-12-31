import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config.js';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const category = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Access-Control-Allow-Origin': '*',
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  };
                  
                const response = await axios.get(`${API_BASE_URL}/api/posts${category}`, { headers });
                setPosts(response.data);
            } catch (error) {
            }
        } 
        fetchData();
    }, [category]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }

  return (
    <div className='home'>
        <div className="posts">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <div className="img">
                        <img src={`../uploads/${post.img}`} alt="" />
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                        <p>{getText(post.description)}</p>
                        <button>Leer Más</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home