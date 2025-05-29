import React, {useEffect, useState} from 'react';
import {fetchMenu} from '../api/api';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

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
            <div className="menu-list">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <img src={item.img_url} alt={item.name} className="menu-image"/>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span>Price: ${item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;