import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Menu from './components/menu'; 
import ProductPlan from './pages/productplan'; 
import PlanR from './pages/PlanR';
import RM from './pages/RM';
import Formula from './pages/formula'; 
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
        <Route path="/formula" element={<Formula />} />
      </Routes>
    </Router>
  );
}

export default App;