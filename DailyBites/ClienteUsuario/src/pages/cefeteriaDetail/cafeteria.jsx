// src/pages/CafeteriaDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchTiendas from '../../hooks/useFetchTiendas';
import { CafeteriaMenuItem } from '../../components'; // Importamos desde el archivo barril

const CafeteriaDetail = () => {
  const { id } = useParams(); // Obtenemos el ID de la tienda desde la URL
  const { tiendas, loading, error } = useFetchTiendas(); // Usamos el hook para obtener todas las tiendas
  const navigate = useNavigate(); // Hook para navegar entre rutas

  if (loading) {
    return <p>Cargando detalles de la tienda...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Busca la tienda específica usando el ID que se pasó desde la URL
  const tienda = tiendas.find((t) => t.id === id); // Asegúrate de que `id` corresponde a la propiedad correcta en `tiendas`

  if (!tienda) {
    return <p>No se encontraron detalles para esta tienda.</p>;
  }

  // Función para manejar la navegación al hacer clic en un menú
  const handleMenuClick = (menuId) => {
    navigate(`/purchase/${tienda.id}/${menuId}`); // Navegamos a la página de PurchaseLunch pasando el id de la tienda y el menuId
  };

  return (
    <div>
      <h1>{tienda.nombre}</h1>
      <div>
        {tienda.menus.map((menu, index) => (
          <CafeteriaMenuItem 
            key={index}
            menu={menu}
            onClick={() => handleMenuClick(menu.nombre)} // Cambia aquí para usar el nombre del menú
          />
        ))}
      </div>
    </div>
  );
};

export default CafeteriaDetail;
