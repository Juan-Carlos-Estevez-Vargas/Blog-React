import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import { API_BASE_URL } from '../../config.js';

const Write = () => {
  const state = useLocation().state;
  const { currentUser } = useContext(AuthContext);
  const [value, setValue] = useState(state?.description || '');
  const [title, setTitle] = useState(state?.title || '');
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState(state?.category || '');
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', img);
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`, // Incluye el token de autenticación en los encabezados
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state ? await axios.put(`${API_BASE_URL}/api/posts/${state.id}`, {
        title, 
        description: value, 
        category, 
        img: img ? imgUrl : ""
      }, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`, // Incluye el token de autenticación en los encabezados
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }) : await axios.post(`${API_BASE_URL}/api/posts`, {
        title, 
        description: value, 
        category, 
        img: img ? imgUrl : "", 
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`, // Incluye el token de autenticación en los encabezados
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });

      navigate('/');      
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder='Título' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <span><b>Estado</b> Borrador</span>
          <span><b>Visibilidad</b> Público</span>
          <input style={{ display: "none" }} type="file" id="file" onChange={e => setImg(e.target.files[0])} />
          <label htmlFor="file">Cargar Imagen</label>
          <div className="buttons">
            <button>Guardar como borrador</button>
            <button onClick={handleSubmit}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoría</h1>
          <div className="cat">
            <input type="radio" checked={category === "arte"} name="categoria" value="arte" id="arte" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="arte">Arte</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "ciencia"} name="categoria" value="ciencia" id="ciencia" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="ciencia">Ciencia</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "tecnologia"} name="categoria" value="tecnologia" id="tecnologia" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="tecnologia">Tecnología</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "cine"} name="categoria" value="cine" id="cine" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="cine">Cine</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "disenio"} name="categoria" value="disenio" id="disenio" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="disenio">Diseño</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "comida"} name="categoria" value="comida" id="comida" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="comida">Comida</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write