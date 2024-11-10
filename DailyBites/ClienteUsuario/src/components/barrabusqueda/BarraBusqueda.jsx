
import React, { useState } from 'react';

const BarraBusqueda = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onFilter(value); // Llama a la función onFilter pasada como prop
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar tiendas o menús..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: '10px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default BarraBusqueda;
