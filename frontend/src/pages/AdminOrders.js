import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/orders');
                setOrders(response.data);
                console.log("orders", orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
            console.log("Orders:", orders);
            }, [orders]);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://127.0.0.1:5000/api/orders/${orderId}`, { status: newStatus });
            // Reload orders
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Admin Orders</h2>
            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Order ID</th>
                        <th className="p-2 border">Items</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="p-2 border">{order.id}</td>
                            <td className="p-2 border">
                                <ul>
                                    {JSON.parse(order.items || "[]").map((item, index) => (
                                        <li key={index}>{item.name} x {item.quantity}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="p-2 border">{order.status}</td>
                            <td className="p-2 border space-x-2">
                                <button 
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => updateStatus(order.id, 'completed')}>
                                    Complete
                                </button>
                                <button 
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => updateStatus(order.id, 'preparing')}>
                                    Preparing
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
