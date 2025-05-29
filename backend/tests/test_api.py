import sys
import os
import pytest
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app 
from extensions import db
from scripts.init_db import init_db

@pytest.fixture
def app():
    app = create_app()
    app.config["TESTING"] = True # use testing mode (no real emails, fasters,..)
    with app.app_context(): # simulate HTTP requests (get, post,..
        init_db()
        yield app # provide this client to the tests

@pytest.fixture
def client(app):
    return app.test_client()
        
def test_get_menu(client):
    response = client.get("/api/menu") # simulate a get request to /api/menu
    assert response.status_code == 200 # check the response status = 200
    data = response.get_json() 
    assert isinstance(data, list) # check the data returned is a list (the menu)
    assert "name" in data[0] # check each item has a "name" key
    
    
def test_add_item(client):
    payload = {
        "id": 100,
        "name": "Vietnamese Iced Coffee",
        "description": "Strong drip coffee over ice with sweetened condensed milk.",
        "price": 3.5,
        "category": "Drinks",
        "img_url": "https://assets.bonappetit.com/photos/57af6d4f53e63daf11a4e57c/master/w_1280%2Cc_limit/vietnamese-iced-coffee-646.jpg"
    }
    response = client.post("/api/menu", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "Item added successfully"
    assert data["name"] == "Vietnamese Iced Coffee"
    
def test_delete_item(client):
    response = client.delete("/api/menu/100")
    assert response.status_code == 200
    data = response.get_json() 
    assert data['message'] == "Item 100 deleted successfully"
    
def test_update_item_price(client):
    payload = {
        "price": 14
    }
    
    response = client.put("api/menu/4", json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "Item 4 price updated to 14"

def test_update_item(client):
    payload = {
        "img_url": "https://tiki.vn/blog/wp-content/uploads/2023/07/gioi-thieu-mon-pho-bo-1024x683.jpg"
    }
    
    response = client.put("api/menu/4", json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "Item 4 updated successfully"
    
def test_create_order(client):
    payload = {
        "table_number": 5,
        "items": [
            { "name": "pho", "quantity": 1 },
            { "name": "spring_roll", "quantity": 2 }
        ],
        "total_price": 10
        }
    
    response = client.post("/api/orders", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "Order placed successfully"
    assert data["table_number"] == "5" # check if the return json has "table number" = 5
    
def test_get_all_orders(client):
    response = client.get("/api/orders")
    assert response.status_code == 200
    data = response.get_json() 
    assert isinstance(data, list)
    assert "id" in data[0] 
    assert "status" in data[0] 
    
def test_get_one_order(client):
    response = client.get("/api/orders/1")
    assert response.status_code == 200
    data = response.get_json() 
    assert data
    assert "id" in data
    assert "status" in data
    
def test_update_order(client):
    payload = {
        "status": "received"
    }
    response = client.put("/api/orders/1", json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Order 1 status updated to received"