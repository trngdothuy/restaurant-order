import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    const [orderItems, setOrderItems] = useState([]);

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
        console.log("Updated orderItems:", orderItems);
      }, [orderItems]);
    
    const removeItemFromOrder = (id) => {
        setOrderItems(orderItems.filter((i) => i.id !== id));
    };

    const clearOrder = () => {
        setOrderItems([]);
    };

    return (
        <OrderContext.Provider 
        value={{orderItems, addItemToOrder, removeItemFromOrder, clearOrder}}
        >
            {children}
        </OrderContext.Provider>
    );
};