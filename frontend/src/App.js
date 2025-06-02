import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import OrderPage from './pages/OrderPage';
import Admin from './pages/Admin';

function App() {
  return (
      <div className="App bg-gray-100 text-gray-800 font-sans min-h-screen">
        <div>
          <Router>
          <h1 className="text-xl font-bold">Welcome To Our Restaurant</h1>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
        </div>
       </div>
  );
}

export default App;
