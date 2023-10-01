import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const [value, setValue] = useState('');

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Título' />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <span><b>Estado</b> Borrador</span>
          <span><b>Visibilidad</b> Público</span>
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">Cargar Imagen</label>
          <div className="buttons">
            <button>Guardar como borrador</button>
            <button>Actualizar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoría</h1>
          <div className="cat">
            <input type="radio" name="categoria" value="arte" id="arte" />
            <label htmlFor="arte">Arte</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="ciencia" id="ciencia" />
            <label htmlFor="ciencia">Ciencia</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="tecnologia" id="tecnologia" />
            <label htmlFor="tecnologia">Tecnología</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="cine" id="cine" />
            <label htmlFor="cine">Cine</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="disenio" id="disenio" />
            <label htmlFor="disenio">Diseño</label>
          </div>
          <div className="cat">
            <input type="radio" name="categoria" value="comida" id="comida" />
            <label htmlFor="comida">Comida</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write