import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factura, CancelButton, ConfirmButton } from '../../components';

const DeliveryPage = () => {
  const [pedido, setPedido] = useState(null);
  const [tienda, setTienda] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codigoPedido = sessionStorage.getItem('codigoPedido');
    const tiendaData = sessionStorage.getItem('tienda');
  
    if (!codigoPedido || !tiendaData) {
      alert('No se encontraron datos del pedido.');
      navigate('/');
      return;
    }
  
    const pedidoGuardado = JSON.parse(sessionStorage.getItem('pedido'));
  
    if (!pedidoGuardado) {
      alert('No se encontraron datos del pedido.');
      navigate('/');
      return;
    }
  
    setPedido(pedidoGuardado);
    setTienda(JSON.parse(tiendaData));
  }, [navigate]);
  

  if (!pedido || !tienda) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Factura</h1>
      <Factura pedido={pedido} tienda={tienda} />
      <CancelButton codigoPedido={pedido.codigoPedido} navigate={navigate} />
      {/* Pasa el objeto pedido al ConfirmButton */}
      <ConfirmButton navigate={navigate} pedido={pedido} /> 
    </div>
  );
};

export default DeliveryPage;
