// src/pages/PurchaseLunch.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchTiendas from '../../hooks/useFetchTiendas';
import { LunchInfo, UserForm, OrderCounter, ReserveButton } from '../../components'; // Importamos desde el archivo barril

const PurchaseLunch = () => {
  const { id, menuId } = useParams(); // Obtenemos el ID de la tienda y el ID del menú
  const { tiendas, loading, error } = useFetchTiendas();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    horaEntrega: '7:00',
    metodoPago: 'Nequi',
  });
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Cambia aquí para usar la función find() en lugar de un acceso directo
  const tienda = tiendas.find((t) => t.id === id); // Buscamos la tienda por ID
  const menu = tienda?.menus.find((m) => m.nombre === menuId); // Buscamos el menú por nombre

  if (!tienda || !menu) {
    return <p>No se encontró la tienda o el menú.</p>;
  }

  return (
    <div>
      <h1>Detalles del Almuerzo</h1>
      <LunchInfo menu={menu} /> {/* Asegúrate de que LunchInfo maneje la imagen */}
      <UserForm formData={formData} setFormData={setFormData} />
      <OrderCounter quantity={quantity} setQuantity={setQuantity} />
      <ReserveButton formData={formData} menu={menu} quantity={quantity} tienda={tienda} /> {/* Pasamos la tienda */}
    </div>
  );
};

export default PurchaseLunch;
