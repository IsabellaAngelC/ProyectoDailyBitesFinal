import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notificaciones } from '../../components';

const Main = () => {
  const [tienda, setTienda] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTienda = localStorage.getItem('tienda');

    if (!selectedTienda) {
      setError('No se ha seleccionado ninguna tienda.');
      return;
    }

    const fetchTiendaData = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiendas');
        if (!response.ok) {
          setError('Error al cargar la información de la tienda');
          return;
        }

        const tiendas = await response.json();
        const tiendaData = tiendas.find(t => t.nombre === selectedTienda);

        if (!tiendaData) {
          setError('Tienda no encontrada.');
        } else {
          setTienda(tiendaData);
          console.log('Tienda seleccionada:', tiendaData.nombre); // Verifica el nombre de la tienda
        }
      } catch (error) {
        setError('Error al cargar la información de la tienda');
      }
    };

    fetchTiendaData();
  }, []);

  const handleSubirAlmuerzo = () => {
    navigate('/upload'); // Redirigir a la página de UploadLunch
  };

  const handleNotificacionesClick = () => {
    navigate('/pedidos'); // Redirigir a la página de Pedidos
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!tienda) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{tienda.nombre}</h1>
      <button onClick={handleSubirAlmuerzo}>Subir Almuerzo</button>
      <h2>Menú</h2>
      <div>
        {tienda.menus.map((menu, index) => (
          <div key={index}>
            <h3>{menu.nombre}</h3>
            <img src={menu.imagen.startsWith('http') ? menu.imagen : `http://localhost:3001/${menu.imagen}`} alt={menu.nombre} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <p>{menu.descripcion}</p>
            <p>Precio: ${menu.precio}</p>
          </div>
        ))}
      </div>
      <Notificaciones tiendaNombre={tienda.nombre} onNotificacionesClick={handleNotificacionesClick} />
    </div>
  );
};

export default Main;
