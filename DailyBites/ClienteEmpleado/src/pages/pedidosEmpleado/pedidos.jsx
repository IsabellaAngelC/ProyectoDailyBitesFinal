import React, { useEffect, useState } from 'react';
import { PedidoCard } from '../../components';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(0); // Para paginación
  const [tiendaActiva, setTiendaActiva] = useState(''); // Guardar la tienda activa

  // Función para cargar los pedidos
  const fetchPedidos = async () => {
    setCargando(true);
    try {
      const response = await fetch(`http://localhost:3001/pedidos?page=${pagina}`);
      const data = await response.json();

      // Filtrar los pedidos por la tienda activa almacenada en localStorage
      const nuevosPedidos = data.filter(pedido => pedido.tienda.nombre === tiendaActiva);
      
      // Evitar pedidos duplicados basados en el código del pedido
      setPedidos((prevPedidos) => {
        const codigosExistentes = prevPedidos.map(p => p.codigoPedido);
        return [...prevPedidos, ...nuevosPedidos.filter(p => !codigosExistentes.includes(p.codigoPedido))];
      });

    } catch (error) {
      console.error('Error al cargar los pedidos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // Obtener la tienda activa desde localStorage
    const tiendaGuardada = localStorage.getItem('tienda');
    if (tiendaGuardada) {
      setTiendaActiva(tiendaGuardada);
    }

    // Cargar pedidos cuando se cambia de página o al montarse el componente
    fetchPedidos();
  }, [pagina, tiendaActiva]); // Añadimos tiendaActiva para recargar si cambia

  const handleCargarMas = () => {
    setPagina((prev) => prev + 1); // Incrementar la página para cargar más
  };

  return (
    <div>
      <h1>Pedidos de {tiendaActiva}</h1> {/* Mostrar la tienda activa */}
      <div>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <PedidoCard key={pedido.codigoPedido} pedido={pedido} />
          ))
        ) : (
          <p>No hay pedidos para mostrar.</p>
        )}
      </div>
      {cargando && <p>Cargando...</p>}
      <button onClick={handleCargarMas} disabled={cargando}>
        Cargar más
      </button>
    </div>
  );
};

export default Pedidos;
