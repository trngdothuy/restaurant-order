import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const fetchMenu = () => axios.get(`${API_BASE_URL}/menu`);
export const placeOrder = (orderData) => axios.post(`${API_BASE_URL}/orders`, orderData);
export const addMenuItem = (itemData) => axios.post(`${API_BASE_URL}/menu`, itemData);
export const deleteMenuItem = (itemId) => axios.delete(`${API_BASE_URL}/menu/${itemId}`);
export const getOrders = () => axios.get(`${API_BASE_URL}/orders`);
