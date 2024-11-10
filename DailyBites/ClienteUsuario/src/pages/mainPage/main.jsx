import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import useFetchTiendas from '../../hooks/useFetchTiendas'; // Importamos nuestro hook
import { TiendaCard, BarraBusqueda, BarraEtiquetas } from '../../components'; // Importamos desde el archivo barril

const MainPage = () => {
  const { tiendas, loading, error } = useFetchTiendas(); // Llamamos a nuestro hook
  const [filteredTiendas, setFilteredTiendas] = useState([]); // Estado para las tiendas filtradas
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  // Si las tiendas se cargan, inicializa filteredTiendas
  useEffect(() => {
    if (!loading && tiendas.length > 0) {
      setFilteredTiendas(tiendas);
    }
  }, [tiendas, loading]); // Asegúrate de incluir `loading` en las dependencias

  if (loading) {
    return <p>Cargando tiendas...</p>;
  }

  if (error) {
    return <p>Error al cargar las tiendas: {error}</p>;
  }

  // Función para filtrar tiendas por término de búsqueda
  const filterTiendas = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = tiendas.filter((tienda) =>
      tienda.nombre.toLowerCase().includes(lowercasedTerm) ||
      tienda.etiquetas.some((etiqueta) => etiqueta.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredTiendas(filtered);
  };

  // Función para filtrar tiendas por etiqueta seleccionada
  const handleSelectEtiqueta = (etiqueta) => {
    const filtered = tiendas.filter((tienda) =>
      tienda.etiquetas.includes(etiqueta)
    );
    setFilteredTiendas(filtered);
  };

  // Función para navegar a los detalles de la tienda
  const handleTiendaClick = (id) => {
    navigate(`/cafeteria/${id}`); // Navegamos usando el id de la tienda
  };

  return (
    <div>
      <h1>Tiendas disponibles</h1>
      <BarraBusqueda onFilter={filterTiendas} /> {/* Componente de búsqueda */}
      <BarraEtiquetas onSelectEtiqueta={handleSelectEtiqueta} /> {/* Componente de etiquetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredTiendas.map((tienda) => (
          <TiendaCard 
            key={tienda.id} // Ahora usamos el id único
            tienda={tienda} 
            onClick={() => handleTiendaClick(tienda.id)} // Ahora usamos el id único
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
