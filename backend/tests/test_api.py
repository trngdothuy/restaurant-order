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
    with app.app_context():
        init_db()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    # with app.test_client() as client: # simulate HTTP requests (get, post,..)
    #     yield client # provide this client to the tests
    return app.test_client()
        
def test_menu(client):
    response = client.get("/api/menu") # simulate a get request to /api/menu
    assert response.status_code == 200 # check the response status = 200
    data = response.get_json() 
    print("data", data)
    assert isinstance(data, list) # check the data returned is a list (the menu)
    assert "name" in data[0] # check each item has a "name" key
    
def test_create_order(client):
    payload = {
        "table_number": "5",
        "items": '[{"id": 1, "quantity": 1}]',
        "total_price": 10.5
    }
    response = client.post("/api/orders", json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data["table_number"] == "5" # check if the return json has "table number" = 5