// src/components/BarraEtiquetas.jsx

import React, { useRef } from 'react';
import { etiquetas } from '../../const/etiquetas'; // Asegúrate de que la ruta sea correcta

const BarraEtiquetas = ({ onSelectEtiqueta }) => {
  const barraRef = useRef(null);
  
  // Variables para el arrastre
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - barraRef.current.offsetLeft;
    scrollLeft = barraRef.current.scrollLeft;
    barraRef.current.style.cursor = 'grabbing'; // Cambia el cursor mientras arrastras
  };

  const handleMouseLeave = () => {
    isDragging = false;
    barraRef.current.style.cursor = 'grab'; // Restablece el cursor
  };

  const handleMouseUp = () => {
    isDragging = false;
    barraRef.current.style.cursor = 'grab'; // Restablece el cursor
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // No hacemos nada si no estamos arrastrando
    e.preventDefault(); // Evitamos el comportamiento predeterminado
    const x = e.pageX - barraRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Cambia el número para ajustar la velocidad del deslizamiento
    barraRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={barraRef}
      style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '10px 0',
        cursor: 'grab',
        whiteSpace: 'nowrap', // Permite que los elementos se alineen horizontalmente
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {etiquetas.map((etiqueta, index) => ( // Muestra todas las etiquetas
        <div
          key={index}
          onClick={() => onSelectEtiqueta(etiqueta)}
          style={{
            padding: '10px',
            margin: '0 5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            textAlign: 'center',
            userSelect: 'none', // Evita que el texto se seleccione
            display: 'inline-block', // Asegura que las etiquetas se alineen correctamente
          }}
        >
          {etiqueta}
        </div>
      ))}
    </div>
  );
};

export default BarraEtiquetas;
