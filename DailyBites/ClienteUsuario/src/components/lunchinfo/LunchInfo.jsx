// src/components/LunchInfo.jsx
import React from 'react';

const LunchInfo = ({ menu }) => {
  return (
    <div>
      <h2>{menu.nombre}</h2>
      <img 
        src={menu.imagen.startsWith('http') ? menu.imagen : `http://localhost:3001/${menu.imagen}`} 
        alt={menu.nombre} 
        style={{ maxWidth: '200px', maxHeight: '200px' }} 
      />
      <p>{menu.descripcion}</p>
      <p>Precio: ${menu.precio}</p>
    </div>
  );
};

export default LunchInfo;
