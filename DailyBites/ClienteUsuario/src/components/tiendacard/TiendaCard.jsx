// src/components/TiendaCard.jsx
import React from 'react';

const TiendaCard = ({ tienda, onClick }) => {
  return (
    <div
      style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', cursor: 'pointer' }}
      onClick={onClick} // Llamamos a la función cuando se hace clic
    >
      <img src={tienda.foto} alt={tienda.nombre} style={{ width: '100%', height: 'auto' }} />
      <h2>{tienda.nombre}</h2>
    </div>
  );
};

export default TiendaCard;
