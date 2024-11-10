import React from 'react';
import { BotonComenzar } from '../../components'; // Importamos desde el archivo barril

const LandingPage = () => {
  return (
    <div>
      <h1>¡Bienvenido a DailyBites!</h1>
      <p>Comienza tu experiencia seleccionando una tienda.</p>
      <BotonComenzar />
    </div>
  );
};

export default LandingPage;
