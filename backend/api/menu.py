from flask import Blueprint, jsonify
from models.MenuItem import MenuItem

menu_bp = Blueprint('menu', __name__)

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