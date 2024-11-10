// src/routers/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingAdmin from '../pages/landingAdmin/landingadmin';
import AdminLogin from '../pages/logIn/AdminLogin';
import Main from '../pages/mainPage/main';
import UploadLunch from '../pages/uploadLunch/upload';
import Pedidos from '../pages/pedidosEmpleado/pedidos'; // Importar la nueva pantalla de pedidos

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingAdmin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/main" element={<Main />} />
      <Route path="/upload" element={<UploadLunch />} />
      <Route path="/pedidos" element={<Pedidos />} /> {/* Nueva ruta para pedidos */}
    </Routes>
  );
};

export default AppRouter;
