// src/pages/LandingAdmin.jsx

import React from 'react';
import { BotonIniciarSesion } from '../../components'; // Asegúrate de crear el nuevo botón

const LandingAdmin = () => {
  return (
    <div>
      <h1>¡Bienvenido a DailyBites Admin!</h1>
      <p>Inicia sesión para acceder a las herramientas administrativas.</p>
      <BotonIniciarSesion /> {/* Botón que lleva a la pantalla de inicio de sesión */}
    </div>
  );
};

export default LandingAdmin;
