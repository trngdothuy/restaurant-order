
# ✨ Set Up the Backend (Flask)

## Step 1️⃣: Create a Virtual Environment & Install Dependencies
```bash
# Create a project folder
mkdir backend
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# .\venv\Scripts\activate  # Windows

# Install dependencies
pip install flask flask-cors flask-sqlalchemy python-dotenv
```

## Step 2️⃣: Set Up Project Structure

```bash
backend/
├── app.py
├── config.py
├── requirements.txt
├── .env
├── 📂 api
│   ├── menu.py
│   ├── orders.py
├── 📂 models
│   ├── MenuItem.py
│   ├── Order.py
├── 📂 services
│   ├── order_service.py
├── 📂 utils
└── README.md
```

## Step 3️⃣: Create config.py
```bash
import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///restaurant.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

## Step 4️⃣: Set Up .env
```bash
DATABASE_URL=sqlite:///restaurant.db
```

## Step 5️⃣: Set Up Database Models
models/MenuItem.py
```bash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() # to avoid the error of circular import

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
```

models/Order.py
```bash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    table_number = db.Column(db.String(10), nullable=False)
    items = db.Column(db.Text, nullable=False)  # JSON string
    total_price = db.Column(db.Float)
    status = db.Column(db.String(50), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
```

## Step 6️⃣: Set Up app.py
```bash
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)

# Register API Blueprints
from api.menu import menu_bp
from api.orders import orders_bp

app.register_blueprint(menu_bp, url_prefix='/api/menu')
app.register_blueprint(orders_bp, url_prefix='/api/orders')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

## Step 7️⃣: Create API Routes
api/menu.py
```bash
from flask import Blueprint, jsonify
from models.MenuItem import MenuItem

menu_bp = Blueprint('menu', __name__)

@menu_bp.route('/', methods=['GET'])
def get_menu():
    items = MenuItem.query.all()
    menu = [{
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'price': item.price,
        'category': item.category,
        'image_url': item.image_url
    } for item in items]
    return jsonify(menu)
```

api/orders.py
```bash
from flask import Blueprint, request, jsonify
from models.Order import Order
from extensions import db
import numpy as np

orders_bp = Blueprint('orders', __name__)

# Create a new order
@orders_bp.route('/', methods=['POST'], strict_slashes=False)
def place_order():
    if not request.is_json:
        return jsonify({"error": "Missing or invalid JSON"}), 400
    data = request.get_json()
    print("Received JSON", data)

    table_number = data.get('table_number')
    items = data.get('items')
    total_price = data.get('total_price')

    if not table_number or not items or not total_price:
        return jsonify({'error': 'Missing required fields'}), 400

    new_order = Order(
        table_number=table_number,
        items=items, # a json list or string
        total_price=total_price,
        status='pending'
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id}), 201

    # Get all order and get 1 order by ID
```

## Step 8️⃣: Save Requirements
```bash
pip freeze > requirements.txt
```

## Step 9️⃣: Initialize Database
```bash
# In Python shell
source venv/bin/activate  # macOS/Linux (if you haven't)
python
>>> from app import app, db # bring in the db object from your Flask app
>>> with app.app_context(): # tell Flask to use the current app's settings (like DB config)
>>>     db.create_all()  # create the database tables in restaurant.db (or your DB of choice)
>>> exit()  # leave the Python shell
```

## Step 10️⃣: Seed Menu Items
```bash
from app import db
from models.MenuItem import MenuItem

# Example data
items = [
    MenuItem(name="Fresh Spring Rolls", description="Rice paper rolls...", price=5.5, category="Appetizer", image_url="/images/spring-rolls.jpg"),
    MenuItem(name="Grilled Pork Bánh Mì", description="Crusty baguette...", price=7.5, category="Bánh Mì", image_url="/images/banh-mi.jpg")
]
db.session.add_all(items)
db.session.commit()
```

## Extra Step:

Here I find it gonna be super helpful to have helper scripts (like "add_dish.py" to add dishes and "init_db.py" to run instead of opening the shell)

Let’s make these two super helpful scripts:
✅ init_db.py → Initialize the database (create tables)
✅ add_dish.py → Add sample menu items

### 🚀 1️⃣ init_db.py
Create this file:
init_db.py
```bash
from app import app, db

with app.app_context():
    db.create_all()
    print("✅ Database tables created!")
```

Run it:
```bash
python init_db.py
```
This creates your database tables (MenuItem and Order) using your models.

### 🚀 2️⃣ add_dish.py
Create this file:
add_dish.py
```bash
from app import app, db
from models.MenuItem import MenuItem

with app.app_context():
    # Sample dishes
    spring_rolls = MenuItem(
        name="Fresh Spring Rolls",
        description="Rice paper rolls filled with shrimp, herbs, vermicelli, and peanut sauce.",
        price=5.5,
        category="Appetizer",
        image_url="/images/spring-rolls.jpg"
    )

    banh_mi = MenuItem(
        name="Grilled Pork Bánh Mì",
        description="Crusty baguette with grilled pork, pickled veggies, and house-made sauce.",
        price=7.5,
        category="Bánh Mì",
        image_url="/images/banh-mi.jpg"
    )

    # Add to the database
    db.session.add_all([spring_rolls, banh_mi])
    db.session.commit()
    print("✅ Sample menu items added!")
```
Run it:
```bash
python seed.py
```

## Optional: Adding a real Table model

🛠️ Add Table model is recommended if you want to:

- Manage table availability

- Avoid typos / invalid tables

- Link orders to tables more cleanly

✅ Otherwise, sticking to table_number as a string is fine for small restaurant apps.

Now, let's make it:

models/Table.py
```bash
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String(10), unique=True, nullable=False)
    status = db.Column(db.String(50), default='available')  # e.g., available, occupied
```

Then, link Order to Table by adding:

```bash
table_id = db.Column(db.Integer, db.ForeignKey('table.id'))
```

## Test File

⚡️ Why These Tests Are Useful?
✅ They check that the API endpoints:
- Are returning the expected status codes
- Return data in the expected format
- Actually create data in the DB
✅ Running pytest runs them automatically!

💡 To Expand
Write more tests to check:
- Edge cases (like missing data)
- Errors (bad table number, invalid payload)
- Order history for a table

/tests/test_api.py

```bash
import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True # use testing mode (no real emails, fasters,..)
    with app.test_client() as client: # simulate HTTP requests (get, post,..)
        yield client # provide this client to the tests

def test_menu(client):
    response = client.get("/api/menu") # simulate a get request to /api/menu
    assert response.status_code == 200 # check the response status = 200
    data = response.get_json() 
    assert isinstance(data, list) # check the data returned is a list (the menu)
    assert "name" in data[0] # check each item has a "name" key

def test_create_order(client):
    payload = {
        "table_number": "5",
        "items": '[{"id":1,"quantity":1}]',
        "total_price": 10.5
    }
    response = client.post("/api/orders", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["table_number"] == "5" # check if the return json has "table number" = 5
```

To avoid the error of "ModuleNotFoundError: No module name 'app'":
- at the top of the test_api.py: 
```bash
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app
```

