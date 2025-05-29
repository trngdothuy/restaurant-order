import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from extensions import db
from models.MenuItem import MenuItem

app = create_app()
with app.app_context():
    spring_rolls = MenuItem(
        name="Fresh Spring Rolls",
        description="Rice paper rolls filled with shrimp, herbs, vermicelli, and peanut sauce.",
        price=5.5,
        category="Appetizer",
        img_url="https://saltedmint.com/wp-content/uploads/2024/01/Vegetable-Spring-Rolls-4-500x375.jpg"
    )
    
    banh_mi = MenuItem(
        name="Grilled Pork Bánh Mì",
        description="Crusty baguette with grilled pork, pickled carrots, daikon, cilantro, and house-made sauce.",
        price=7.5,
        category="Bánh Mì",
        img_url="https://www.foodandwine.com/thmb/S1Hx4hfx_K-IOjnpyxkTxodfuos=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HD-201205-r-grilled-pork-banh-mi-90d017890ee54dcaa7b3f26fbe103bd9.jpg"
    )
    
    # Add to the database
    db.session.add_all([spring_rolls, banh_mi])
    db.session.commit()
    print("✅ Sample menu items added!")