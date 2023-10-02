import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/posts/?categoria=${category}`);
                setPosts(response.data);
            } catch (error) {
                console.log(error); 
            }
        }    
    })

  return (
    <div className="menu">
        <h1>Otros posts que podrían gustarte</h1>
        {posts.map(post => (
            <div className="post" key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Leer más</button>
            </div>
        ))}
    </div>
  )
}

export default Menu