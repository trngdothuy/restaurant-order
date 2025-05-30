import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import Admin from './components/Admin';
import NavBar from './NavBar';


function App() {
  return (
      <div className="App bg-gray-100 text-gray-800 font-sans min-h-screen">
        <div>
          <Router>
          <h1 className="text-xl font-bold">Welcome To Our Restaurant</h1>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
        </div>
       </div>
  );
}

export default App;
