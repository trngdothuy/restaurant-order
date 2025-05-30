import React, {useEffect, useState, useContext} from 'react';
import {fetchMenu} from '../api/api';
import { OrderContext } from './OrderContext';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const {addItemToOrder} = useContext(OrderContext);
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, value) => {
        // update local state for that item's quantity
        setQuantities({...quantities, [id]: parseInt(value)});
        console.log("quantities", quantities)
    };

    const handleAddToOrder = (item) => {
        const quantity = quantities[item.id] || 1 // default to 1
        addItemToOrder(item, quantity);
    }

    useEffect(() => {
        fetchMenu()
        .then((res) => {
            setMenuItems(res.data);
        })
        .catch((err) => {
            console.error('Error fetching menu:' , err);
        });
    }, []);

    return (
        <div className="menu-container">
            <h2>Our Menu</h2>
            <div className="menu-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item bg-white rounded shadow p-4 flex flex-col items-center">
                        <img src={item.img_url} alt={item.name} className="menu-image w-full h-40 object-cover rounded"/>
                        <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <span className="mt-2 font-bold">Price: ${item.price}</span>
                        <input
                        type="number"
                        min="1"
                        value={quantities[item.id] || 1}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                        <button onClick={() => handleAddToOrder(item)}>Add to Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;