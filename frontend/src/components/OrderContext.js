import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    const [orderItems, setOrderItems] = useState(() => {
        const stored = localStorage.getItem("orderItems");
        return stored ? JSON.parse(stored) : [];
    });

    const addItemToOrder = (item, quantity) => {
        // check if item already in order
        const existingItem = orderItems.find((i) => i.id === item.id);
        if (existingItem) {
            // update quantity
            setOrderItems(
                orderItems.map((i) => 
                i.id === item.id 
                ? {...i, quantity: i.quantity + quantity } 
                : i)
            )
        } else {
            setOrderItems([...orderItems, {...item, quantity}]);
        }
    };

    useEffect(() => {
        localStorage.setItem("orderItems", JSON.stringify(orderItems));
        console.log("Updated orderItems:", orderItems);
      }, [orderItems]);
    

    const clearOrder = () => {
        setOrderItems([]);
    };

    const removeItem = (itemId) => {
        setOrderItems(orderItems.filter((item) => item.id !== itemId));
    };

    const increaseQuantity = (itemId) => {
        setOrderItems(
            orderItems.map((item) => item.id === itemId 
            ? {...item, quantity: item.quantity + 1} 
            : item)
        );
    };

    const decreaseQuantity = (itemId) => {
        setOrderItems(
            orderItems.map((item) => item.id === itemId 
            ? {...item, quantity: Math.max(item.quantity - 1, 1)} 
            : item)
        );
    };

    return (
        <OrderContext.Provider 
        value={{orderItems, addItemToOrder, removeItem, increaseQuantity, decreaseQuantity, clearOrder}}
        >
            {children}
        </OrderContext.Provider>
    );
};