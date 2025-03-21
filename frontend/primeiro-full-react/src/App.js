import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro'; 
import PaginaPrincipal from './components/PaginaPrincipal';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/cadastro" element={<Cadastro />} /> 
      <Route path="/pagina-principal" element={<PaginaPrincipal />} />
    </Routes>
  );
}

export default App;