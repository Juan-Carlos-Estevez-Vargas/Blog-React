import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'

const Write = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState('');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', img);
      const response = await axios.post('http://localhost:8800/api/upload', formData);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = upload();

    try {

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Título' onChange={e => setTitle(e.target.value)} />
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
            <input type="radio" name="categoria" value="arte" id="arte" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="arte">Arte</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="ciencia" id="ciencia" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="ciencia">Ciencia</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="tecnologia" id="tecnologia" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="tecnologia">Tecnología</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="cine" id="cine" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="cine">Cine</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="disenio" id="disenio" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="disenio">Diseño</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="comida" id="comida" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="comida">Comida</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write