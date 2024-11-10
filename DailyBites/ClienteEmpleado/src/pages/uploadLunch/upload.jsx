// src/pages/UploadLunch.jsx
import React, { useState, useEffect } from 'react';

const UploadLunch = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([
    'Todo',
    'Bowl',
    'Comida rápida',
    'Ensalada',
    'Pastelería',
    'Almuerzos',
    'Cenas',
    'Desayunos'
  ]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImagen(file);

    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('tienda', localStorage.getItem('tienda')); // Nombre de la tienda

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setImageUrl(data.imageUrl); // Guardar la URL de la imagen subida
    } catch (error) {
      setError('Error al subir la imagen.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que la imagen haya sido subida
    if (!imageUrl) {
      setError('Por favor sube una imagen antes de continuar.');
      return;
    }

    const nuevoMenu = {
      nombre,
      precio: parseFloat(precio),
      descripcion,
      etiqueta,
      imagen: imageUrl
    };

    try {
      const response = await fetch('http://localhost:3001/tiendas/addmenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tienda: localStorage.getItem('tienda'),
          menu: nuevoMenu
        })
      });

      if (!response.ok) {
        setError('Error al guardar el menú.');
        return;
      }

      setSuccess('Menú añadido con éxito.');
    } catch (error) {
      setError('Error al guardar el menú.');
    }
  };

  return (
    <div>
      <h2>Subir Almuerzo</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del menú:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Etiqueta:</label>
          <select value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} required>
            <option value="">--Selecciona una etiqueta--</option>
            {etiquetasDisponibles.map((etiqueta, index) => (
              <option key={index} value={etiqueta}>{etiqueta}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Subir imagen del menú:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div>
        <button type="submit">Subir Menú</button>
      </form>
    </div>
  );
};

export default UploadLunch;
