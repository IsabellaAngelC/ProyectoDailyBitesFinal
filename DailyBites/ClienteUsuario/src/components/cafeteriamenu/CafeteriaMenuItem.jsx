// src/components/CafeteriaMenuItem.jsx
import React from 'react';

const CafeteriaMenuItem = ({ menu, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{menu.nombre}</h3>
      <img 
        src={menu.imagen.startsWith('http') ? menu.imagen : `http://localhost:3001/${menu.imagen}`} 
        alt={menu.nombre} 
        style={{ maxWidth: '100px', maxHeight: '100px' }} 
      />
      <p>{menu.descripcion}</p>
      <p>Precio: ${menu.precio}</p>
    </div>
  );
};

export default CafeteriaMenuItem;
