import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonComenzar = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/main'); // Navegamos a la página principal
  };

  return (
    <button onClick={handleComenzar}>
      Comenzar
    </button>
  );
};

export default BotonComenzar;
