import React, { useState, useEffect } from 'react';
import Menu from './Menu'; // or wherever your Menu component is
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders'; // the orders admin page you just made

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');

  useEffect(() => {
          console.log("Active Tab:", activeTab);
          }, [activeTab]);

  const renderContent = () => {
    if (activeTab === 'menu') {
      return <AdminMenu />;
    } else if (activeTab === 'orders') {
      return <AdminOrders />;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-4 ">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-2 py-1 text-lg font-medium focus:outline-none transition-colors duration-300 border-none divide-dashed w-1/2 text-right
            ${
            activeTab === 'menu'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
    }`}
          
        >
          Menu
        </button>
        
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-2 py-1 text-lg font-medium focus:outline-none transition-colors duration-300 border-none divide-dashed w-1/2 text-left ${
            activeTab === 'orders'
                ? 'text-blue-600 border-b-2'
                : 'text-gray-600 hover:text-blue-600'
    }`}
        >
          Orders
        </button>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
