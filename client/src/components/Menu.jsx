import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../config.js';

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);

    const headers = {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/posts/?categoria=${category}`, { headers });
                setPosts(response.data);
            } catch (error) {
                console.log(error); 
            }
        }    
        fetchData();
    });

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

  return (
    <div className="menu">
        <h1>Otros posts que podrían gustarte</h1>
        {posts.map(post => (
            <div className="post" key={post.id}>
                <img src={`../uploads/${post?.img}`} alt="" />
                <h2>{getText(post.title)}</h2>
                <button>Leer más</button>
            </div>
        ))}
    </div>
  )
}

export default Menu