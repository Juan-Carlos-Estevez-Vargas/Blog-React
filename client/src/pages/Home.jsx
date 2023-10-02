import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const category = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/posts'+category);
                setPosts(response.data);
            } catch (error) {
            
            }
        } 
        fetchData();
    }, [category]);

  return (
    <div className='home'>
        <div className="posts">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <div className="img">
                        <img src={post.img} alt="" />
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                        <p>{post.description}</p>
                        <button>Leer Más</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home