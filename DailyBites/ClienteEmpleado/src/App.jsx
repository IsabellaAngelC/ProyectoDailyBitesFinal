
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter'; // Importamos el enrutador

const App = () => {
  return (
    <Router>
      <AppRouter /> {/* Usamos el enrutador aquí */}
    </Router>
  );
};

export default App;
