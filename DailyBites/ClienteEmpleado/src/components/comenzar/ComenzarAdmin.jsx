

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonIniciarSesion = () => {
  const navigate = useNavigate();

  const handleIniciarSesion = () => {
    navigate('/admin-login'); // Navegamos a la pantalla de inicio de sesión del empleado
  };

  return (
    <button onClick={handleIniciarSesion}>
      Iniciar sesión
    </button>
  );
};

export default BotonIniciarSesion;
