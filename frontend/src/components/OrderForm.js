import React, { useState, useContext } from 'react';
import { OrderContext } from './OrderContext';
import axios from "axios";

const OrderForm = () => {
    const [tableNumber, setTableNumber] = useState('');
    const [items, setItems] = useState([{name: '', quantity: 1}]);
    // const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState('');

    const { orderItems, clearOrder } = useContext(OrderContext);
    console.log("Order Items in OrderForm:", orderItems)

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
        console.log("items", items)
    };

    const handleAddItem = () => {
        setItems([...items, {name: '', quantity: 1}]);
    };

    const handleSubmit = async (e) => {
        if (orderItems.length === 0) {
            alert("Your order is empty!")
            return;
        }
        e.preventDefault();

        const totalPrice = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        );

        const payload = {
            table_number: parseInt(tableNumber),
            items: items,
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
            })
            .catch((err) => {
              console.error("Fetch error:", err);
            });
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {message && <p className="mb-2 text-green-600">{message}</p>}
            {orderItems.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <button onClick={handleSubmit}>Place Order</button>
            
            {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Table Number: </label>
                    <br></br>
                    <input
                        type="number"
                        placeholder="Table Number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block">Items: </label>
                    <br></br>
                    {items.map((item, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            placeholder="Item name"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            required
                            className="border p-2 flex-1"
                        />
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                            handleItemChange(index, 'quantity', parseInt(e.target.value))
                            }
                            required
                            className="border p-2 w-16"
                        />
                        <button type="button" onClick={() => removeItem(index)}>
                            x
                        </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                        Add Item
                    </button>
                    

                    </div>

                    <div className="space-y-4 bg-white p-4 rounded shadow">
                    <label className="block">Total Price:</label>
                    <br></br>
                    {orderItems.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <button onClick={handleSubmit}>Place Order</button>
                    <input
                        type="number"
                        step="0.01"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    </div>

                    <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                    Submit Order
                    </button>
            </form>
             */}
        </div>
    );
};

export default OrderForm;