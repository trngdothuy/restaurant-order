# ✅ 1️⃣ Project Setup
- Create React App
- Run this in your frontend directory (or - wherever you want your React app):

```bash
npx create-react-app@latest frontend
cd frontend
```

Install Axios (for HTTP requests):
```bash
npm install axios
````

Clean up (optional):
- Remove boilerplate files like logo.svg, App.test.js, etc.
- Keep App.js, index.js, and index.css for starters.
```

# ✅ 2️⃣ Project Structure
Here’s a clean, scalable structure:

```bash
frontend/
├── public/
├── src/
│   ├── api/              # Axios API logic (e.g., api.js)
│   │   ├── api.js
│   ├── components/       # React components (Menu, OrderForm, etc.)
│   │   ├── NavBar.js
│   │   ├── OrderContext.js
│   ├── pages/            # Page components (Home, Orders)
│   │   ├── Admin.js
│   │   ├── Menu.css
│   │   ├── Menu.js
│   │   ├── OrderPage.js
│   │   ├── OrderPage.css
│   ├── utils/            # Helper functions
│   ├── App.js            # Main App component
│   ├── index.js          # Entry point
│   └── index.css         # Styles
├── package.json
└── ...
```

# ✅ 3️⃣ Axios API File
Create src/api/api.js:

```bash
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // backend url

export const fetchMenu = () => axios.get(`${API_BASE_URL}/menu`);
export const placeOrder = (orderData) => axios.post(`${API_BASE_URL}/orders`, orderData);
export const addMenuItem = (itemData) => axios.post(`${API_BASE_URL}/menu`, itemData);
export const deleteMenuItem = (itemId) => axios.delete(`${API_BASE_URL}/menu/${itemId}`);
export const getOrders = () => axios.get(`${API_BASE_URL}/orders`);
```

# ✅ 4️⃣ Basic Components
For example, create src/components/Menu.js:

```bash
import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../api/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenu()
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching menu:', err);
      });
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
```

# ✅ 5️⃣ Put Components in App.js
```bash
import React from 'react';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <h1>Vietnamese Restaurant</h1>
      <Menu />
      {/* Later: OrderForm, Admin Panel, etc. */}
    </div>
  );
}

export default App;
```

# ✅ 6️⃣ Run it!
```bash
npm start
Visit: http://localhost:3000
```

# ✅ 7️⃣ Create Menu.css
In the same folder as Menu.js, create Menu.css:

```bash
.menu-container {
  padding: 20px;
  text-align: center;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 250px;
  margin: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  transition: transform 0.2s;
}

.menu-item:hover {
  transform: scale(1.05);
}

.menu-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
}

.menu-item h3 {
  margin: 10px 0 5px;
}

.menu-item p {
  font-size: 14px;
  color: #555;
}

.menu-item span {
  font-weight: bold;
  color: #333;
}
```
# ✅ 8 Create OrderForm.js to place orders

1️⃣ Routing / Navigation
- Use React Router to toggle between Menu, OrderForm, and Admin views.
- Example routes:
/ → Menu
/order → OrderForm
/admin → Admin

2️⃣ OrderForm.js
- Make a form that POSTs to your backend’s /api/orders endpoint.
- Use fetch or Axios for the API call.
- Display a success message when the order is placed.

# ✅ 9 Create Admin.js to add/delete items

- A form to add new menu items
- List of items with delete buttons
- Calls /api/menu (GET/POST/DELETE) endpoints

# ✅ 10 Style it nicely (CSS frameworks like Tailwind, Bootstrap, or plain CSS)

- Use Tailwind CSS, Bootstrap, or plain CSS.
- Example:
Tailwind:

```bash
npm install -D tailwindcss
npx tailwindcss init
```
- Then in  CSS:

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Or use Bootstrap via CDN in HTML.