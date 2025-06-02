import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { OrderContext } from '../components/OrderContext';
import axios from "axios";
import "./OrderPage.css";

const OrderPage = () => {
    const navigate = useNavigate();
    const [tableNumber, setTableNumber] = useState('');
    const [items, setItems] = useState([{name: '', quantity: 1}]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { orderItems, clearOrder, increaseQuantity, decreaseQuantity, removeItem } = useContext(OrderContext);

    useEffect(() => {
        console.log("Updated orderItems from orderForm:", orderItems);
        }, [orderItems]);
    console.log("Order Items in OrderForm:", orderItems)

    const totalPrice = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = async (e) => {
        if (orderItems.length === 0) {
            setError("Your order is empty!")
            return;
        }
        if (!tableNumber) {
            setError('Missing table number.');
            return
        }

        setLoading(true);
        setError(null);

        const payload = {
            table_number: parseInt(tableNumber, 10),
            items: orderItems.map(({name, quantity}) => ({name, quantity})),
            total_price: parseFloat(totalPrice)
        };

        console.log('payload', payload)

        fetch("http://127.0.0.1:5000/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
              console.log("Order placed:", data);
              setMessage(`Your order number ${data.order_id} has been placed.`)
              // Reset
              clearOrder()
              setTableNumber("")
            })
            .catch((err) => {
                setError("Failed to place order. Please try again.")
              console.error(err);
            })
            .finally(setLoading(false));
    };

    return (
        <div className="p-4 max-w- mx-auto">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {/* Render table with items, quantity, price, total... */}
            <div className="my-4">
                <label>
                Table Number:{' '}
                <input
                    type="number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="border p-1 rounded"
                />
                </label>
            </div>
            {error && <p className="mb-2 text-green-600">{error}</p>}
            {message && <p className="mb-2 text-green-600">{message}</p>}
            {/* If order is empty */}
            {orderItems.length === 0 ? (
                <div>
                    <p className="empty-message">Your order is empty.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-1/2 mx-2 disabled:opacity-50"
                        >Start Order</button>
                </div>
                
            ) : (
                <div className="overflow-x-auto">
                <div className="order-table min-w-full table-fixed border-collapse">
                    <div className="bg-gray-100 text-gray-700">
                        {/* Headers */}
                        <div className="flex font-bold border-b border-gray-300 py-2 bg-gray-100">
                            <div className="w-1/4 py-2 px-4 text-center">Image</div>
                            <div className="w-1/4 py-2 px-4 text-center">Item</div>
                            <div className="w-1/4 py-2 px-4 text-center">Price ($)</div>
                            <div className="w-1/4 py-2 px-4 text-center">Quantity</div>
                            <div className="w-1/4 py-2 px-4 text-center">Total ($)</div>
                        </div>
                    </div>
                    {/* Items */}
                    <div>
                        {orderItems.map((item) => (
                            <div key = {item.id} className="flex border-b border-gray-300 py-2 bg-gray-100">
                            {/* Image */}
                            <div className="py-2 w-1/4">
                                <img 
                                    src = {item.img_url}
                                    alt = {item.name}
                                    className="h-16 w-16 object-cover rounded"/>
                            </div>
                            {/* Item Name */}
                            <div className="w-1/4 py-2 px-4 text-center">{item.name}</div>
                            {/* Price */}
                            <div className="w-1/4 py-2 px-4 text-center">{item.price.toFixed(2)}</div>
                            {/* Quantity */}
                            <div className="w-1/4 py-2 px-4 text-center">
                                <button 
                                    onClick={() => decreaseQuantity(item.id)} className="text-gray-600 hover:text-black mx-1"
                                    style={{ border: "none", background: "none", padding: 1 }}>
                                        -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                    onClick={() => increaseQuantity(item.id)} 
                                    className="text-gray-600 hover:text-black mx-1"
                                    style={{ border: "none", background: "none", padding: 1 }}>
                                        +
                                </button>
                            </div>
                            {/* Total price and delete */}
                            <div className="w-1/4 py-2 px-4 text-center">
                                <span>{(item.price * item.quantity).toFixed(2)}</span>
                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 mx-1 hover:text-red-700"
                                    style={{ border: "none", background: "none", padding: 0}}
                                >
                                    x
                                </button>
                            </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Total */}
                    <div className="flex font-bold py-2 mt-4 border-t border-gray-300">
                        {/* empty for image and item col */}
                        <div className="w-1/3"></div>
                        <div className="w-1/3"></div>
                        <div className="order-total-label w-1/4 px-2 text-right">
                            <strong>Total:</strong>
                        </div>
                        <div className="order-total w-1/4 px-2">${totalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="flex text-center py-2 ">
                        <button onClick={() => navigate('/')} className="w-1/2 mx-2 disabled:opacity-50">Add More Item</button>
                        <button onClick={handleSubmit} className="w-1/2 mx-2 disabled:opacity-50"> 
                            {loading ? 'Placing order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            )} 
        </div>
    );
};

export default OrderPage;