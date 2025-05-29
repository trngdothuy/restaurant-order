from flask import Blueprint, jsonify, request
from models.MenuItem import MenuItem
from extensions import db

menu_bp = Blueprint('menu', __name__)

# Get all menus
@menu_bp.route('/', methods=['GET'], strict_slashes=False)
def get_menu():
    items = MenuItem.query.all()
    menu = [{
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'price': item.price,
        'category': item.category,
        'img_url': item.img_url        
    } for item in items]
    return jsonify(menu)

# Add item to menu
@menu_bp.route('/', methods=['POST'], strict_slashes=False)
def add_item():
    if not request.is_json:
        return jsonify({"error": "Missing or invalid JSON"}), 400
    data = request.get_json()
    # if not all(k in data for k in ("name", "description", "price", ))
    print("Add New Item", data)

    id = data.get('id')
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    category = data.get('category')
    img_url = data.get('img_url')
    
    if not name or not price or not id:
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_item = MenuItem(
        id = id,
        name = name,
        description = description,
        price = price,
        category = category,
        img_url = img_url
    )
    
    db.session.add(new_item)
    db.session.commit()
    
    return jsonify({
        "message": "Item added successfully",
        "item_id": new_item.id,
        "name": new_item.name,
        "description": new_item.description,
        "price": new_item.price,
        "category": new_item.category,
        "img_url": new_item.img_url
    }), 201
    
# Delete item
@menu_bp.route('/<int:item_id>', methods=['DELETE'], strict_slashes=False)
def delete_item(item_id):
    item = MenuItem.query.get(item_id)
    if not item: 
        return jsonify({'error': 'Item not found'}), 404
    
    db.session.delete(item)
    db.session.commit()
    
    return jsonify({'message': f'Item {item_id} deleted successfully'}), 200
        
        
# Update item:
@menu_bp.route('/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    item = MenuItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404
    
    # Only update the field if existing in payload
    if 'name' in data:
        item.name = data['name']
    if 'description' in data:
        item.description = data['description']
    if 'price' in data:
        item.price = data['price']
    if 'category' in data:
        item.category = data['category']
    if 'img_url' in data:
        item.img_url = data['img_url']
    
    db.session.commit()
    return jsonify({'message': f'Item {item_id} updated successfully'}), 200