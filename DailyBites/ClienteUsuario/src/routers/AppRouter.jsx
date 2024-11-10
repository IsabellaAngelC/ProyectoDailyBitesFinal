import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  LandingPage, 
  MainPage, 
  CafeteriaDetail, 
  PurchaseLunch, 
  DeliveryPage
} from '../pages'; 
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/cafeteria/:id" element={<CafeteriaDetail />} /> {/* Ruta dinámica para cafetería */}
      <Route path="/purchase/:id/:menuId" element={<PurchaseLunch />} /> {/* Ruta para compra */}
      <Route path="/delivery" element={<DeliveryPage />} /> {/* Ruta para la página de entrega */}
    </Routes>
  );
};

export default AppRouter;
