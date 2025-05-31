import React, { useState, useContext, useEffect } from 'react';
import { OrderContext } from '../components/OrderContext';
import axios from "axios";

const AdminMenu = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        img_url: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    // Fetch all menu items
    useEffect(() => {
        fetchMenuItems();
    }, []);

    useEffect(() => {
            console.log("Updated form data:", formData);
            }, [formData]);

    useEffect(() => {
        console.log("Loading:", loading);
        }, [loading]);

    useEffect(() => {
        console.log("Editing item:", editingItem);
        }, [editingItem]);

    const fetchMenuItems = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/menu');
            setMenuItems(res.data);
            console.log("menu items", menuItems);
        } catch (err) {
            setError('Failed to fetch menu items');
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/menu', {
                ...formData,
                price: parseFloat(formData.price),
            });
            setMenuItems([...menuItems, res.data]);
            setFormData({
                id: '',
                name: '',
                description: '',
                price: '',
                category: '',
                img_url: '',   });
            fetchMenuItems();
        } catch (err) {
            setError('Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
             await axios.delete(`http://127.0.0.1:5000/api/menu/${id}`);
            setMenuItems(menuItems.filter(item => item.id !== id));
        } catch {
            setError('Failed to delete item');
        }
    };

    // Edit Button Clicked
    const handleEditClick = (item) => {
        setEditingItem(item);
        setFormData({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            img_url: item.img_url});
        console.log("form data", formData)
    }

    const handleUpdateItem = async () => {
        if (!editingItem) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://127.0.0.1:5000/api/menu/${editingItem.id}`, formData);

            if (response.status === 200) {
                alert("Item updated successfully");
                setEditingItem(null);
                setFormData({
                    id: "",
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    img_url: ""
                });
                fetchMenuItems();
            } else {
                alert("Failed to update item");
                setError('Failed to update item')
            }
        } catch (error) {
            console.error("Error updating item:", error);
            setError('Failed to update item')
        } finally {
            setLoading(false)
        }
    };
    
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Admin</h2>

            {error && <p className="mb-2 text-red-600">{error}</p>}

            <form onSubmit={handleAddItem} className="mb-6 space-y-3">
            <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ID"
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 rounded w-full"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 round w-full"
                    required
                />  
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-2 rounded w-full"
                    step="0.01"
                    required
                />
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder='Category'
                    className='border p-2 rounded w-full'
                    required
                >
                    <option value="">Select a category</option>
                    <option value="Main">Main</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drink">Drink</option>
                </select>
                <input
                    type="text"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleChange}
                    placeholder="Image Link"
                    className="border p-2 rounded w-full"
                    step="0.01"
                    required
                />
                <button
                    type={editingItem ? "update" : "add"}
                    disabled={loading}
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    onClick={editingItem ? handleUpdateItem : handleAddItem}
                >
                    {editingItem 
                    ? "Update Item" 
                    : "Add Item"}
                </button>
            </form>

            <div>
                <h3 className="text-2xl mb-3">Current Menu Items</h3>
                {menuItems.length === 0 ? (
                    <p>No menu items yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {menuItems.map(item => (
                            <li key={item.id} className="flex items-center space-x-4 border p-2 rounded">
                                <img src={item.img_url || 'https://via.placeholder.com/60'} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                                <div className="flex-grow">
                                    <h4 className="font-semibold">[{item.id}] - {item.name}</h4>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-sm font-bold">{item.price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                </div>
                                <button
                                className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                onClick={() => handleEditClick(item)}
                                >
                                Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="text-red-600 hover:text-red-800 py-1 px-1"
                                    title="Delete Item"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminMenu;