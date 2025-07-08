import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Menu from './components/menu'; 
import ProductPlan from './pages/productplan'; 
import PlanR from './pages/PlanR'; 
import RM from './pages/RM';
import Inventory from './pages/inventory';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/productplan" element={<ProductPlan />} />
        <Route path="/planr" element={<PlanR />} />
        <Route path="/rm" element={<RM />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;