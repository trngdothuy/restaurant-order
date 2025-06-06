![build](https://img.shields.io/github/actions/workflow/status/trngdothuy/restaurant-order/ci.yml)
![last commit](https://img.shields.io/github/last-commit/trngdothuy/restaurant-order)
![license](https://img.shields.io/github/license/trngdothuy/restaurant-order)

# 🌟 Restaurant Ordering Web App

```bash
It’s a:
✅ Vietnamese restaurant featuring rolls and bánh mì
✅ Customers scan a QR code at the table → order directly from their phone
✅ Kitchen/staff sees the order instantly
✅ Faster service, no waiting for staff to come over

Client Type: Small restaurant or café that wants a modern, mobile-first digital ordering system
Stack: React + TailwindCSS + FastAPI + Firebase
```

```bash
🛠️ Features Delivered:

📋 Menu system with categories, items, and modifiers

🛒 Order cart with real-time updates

🔐 Login system using Firebase

📦 Admin dashboard to manage items

🌐 Fully responsive UI (mobile/tablet/desktop)

🔐 Tech Highlights:
- React + TypeScript frontend
- FastAPI backend with RESTful architecture
- Firebase authentication
- Deployed with AWS
- Easily extendable to Stripe/QR-based ordering


```




# 🏗️ Updated Architecture

```bash
📦 restaurant-order
├── 📂 backend
│   ├── app.py
│   ├── 📂 api
│   │   ├── menu.py           # GET menu
│   │   ├── orders.py         # POST orders
│   │   ├── tables.py         # Table info (optionalm for future)
│   ├── 📂 models
│   │   ├── MenuItem.py
│   │   ├── Order.py
│   │   ├── Table.py          # Table QR code mapping (optional)
│   ├── 📂 scripts
│   │   ├── add_dish.py # to add first 2 dishes
│   │   └── init_db.py # to restart db
│   ├── 📂 services
│   │   ├── order_service.py
│   │   └── menu_service.py # optional
│   ├── 📂 tests
│   │   ├── __init__.py
│   │   └── test_api.py # optional
│   ├── 📂 utils
│   ├── config.py
│   ├── requirements.txt
│   └── .env
│   └── config.py
│   └── extensions.py # connect alchemy
│   └── README.md
│   └── requirements.txt
├── 📂 frontend
│   ├── public/
│   ├── src/
│   │   ├── 📂 api # Axios API logic (e.g., api.js)
│   │   │   ├── api.js
│   │   ├── 📂 components # React components (Menu, OrderForm, etc.)
│   │   │   ├── Menu.css
│   │   │   ├── Menu.js
# │   │   │   ├── OrderForm.js
│   │   ├── 📂 pages # Page components (Home, Orders)
│   │   │   ├── HomePage.js
│   │   │   ├── MenuPage.js
│   │   │   ├── OrderPage.js
│   │   ├── 📂 services
│   │   │   ├── api.js         # Fetches menu, orders
│   │   ├── 📂 utils
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── App.css
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
└── node_modules/
└── package-lock.json
└── package.json
└── README.md
```

# 📲 How It Works for Customers

```bash
1️⃣ Customer scans QR code on the table → opens your web app
2️⃣ The QR code might contain a table number (e.g., https://yourdomain.com/table/12)
3️⃣ Customer sees the menu and orders directly from their phone
4️⃣ Order is sent to your Flask backend → staff’s kitchen dashboard
5️⃣ Staff prepares food and delivers to table
✅ No waiting for staff to come take orders!
```

# 🥖 Example Menu Items (MenuItem Model)

```bash
[
    {
        "name": "Fresh Spring Rolls",
        "description": "Rice paper rolls filled with shrimp, herbs, vermicelli, and peanut sauce.",
        "price": 5.5,
        "category": "Appetizer",
        "img_url": "https://saltedmint.com/wp-content/uploads/2024/01/Vegetable-Spring-Rolls-4-500x375.jpg"
    },
    {
        "name": "Grilled Pork Bánh Mì",
        "description": "Crusty baguette with grilled pork, pickled carrots, daikon, cilantro, and house-made sauce.",
        "price": 7.5,
        "category": "Bánh Mì",
        "img_url": "https://www.foodandwine.com/thmb/S1Hx4hfx_K-IOjnpyxkTxodfuos=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HD-201205-r-grilled-pork-banh-mi-90d017890ee54dcaa7b3f26fbe103bd9.jpg"
    },
    {
        "name": "Beef Phở",
        "description": "Rich beef broth with rice noodles, thinly sliced beef, herbs, and lime.",
        "price": 9.0,
        "category": "Main",
        "image_url": "/images/pho.jpg"
    },
    {
        "name": "Vietnamese Iced Coffee",
        "description": "Strong drip coffee over ice with sweetened condensed milk.",
        "price": 3.5,
        "category": "Drinks",
        "image_url": "/images/iced-coffee.jpg"
    }
]
```

# 📝 Order Model with Table Number

```bash
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    table_number = db.Column(db.String(10), nullable=False)
    items = db.Column(db.Text)  # JSON of items ordered
    total_price = db.Column(db.Float)
    status = db.Column(db.String(50), default='pending')  # pending, preparing, done
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
```

# 🚀 Key Features to Build

```bash
✅ Backend:

GET /api/menu – Get menu

POST /api/orders – Submit new order (with table number)

DELETE /api/menu/<id> → Delete menu item

PUT /api/menu/<id> → Update menu item

POST /api/orders → Place order

GET /api/orders → View orders

PUT /api/orders/<id> → Update order status

✅ Frontend:

/menu – Browse dishes

/order – View and edit cart, confirm order

/table/:tableNumber – View menu specific to that table

✅ Optional: Kitchen Dashboard

/admin/orders – Staff sees incoming orders in real-time
```
