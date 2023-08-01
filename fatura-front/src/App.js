import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HistoricoFaturas from './historico-faturas.js'; 
import Dashboard from './dashboard.js'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HistoricoFaturas />} />
        <Route path="/dashboard/:numeroCliente" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
