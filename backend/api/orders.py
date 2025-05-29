from flask import Blueprint, request, jsonify
from models.Order import Order
from extensions import db

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['POST'], strict_slashes=False)
def place_order():
    if not request.is_json:
        return jsonify({"error": "Missing or invalid JSON"}), 400
    data = request.get_json()
    print("Received JSON", data)
    
    table_number = data.get('table_number')
    items = data.get('items')
    total_price = data.get('total_price')
    
    new_order = Order(
        table_number = table_number,
        items = str(items),
        total_price = total_price,
        status = 'pending'
    )
    
    db.session.add(new_order)
    db.session.commit()
    
    return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id})

@orders_bp.route('/', methods=['GET'], strict_slashes=False)
def get_orders():
    orders = Order.query.all()
    orders_data = []
    for order in orders:
        orders_data.append({
            'id': order.id, 
            'table_number': order.table_number,
            'items': order.items,
            'total_price': order.total_price,
            'status': order.status
        })
    return jsonify(orders_data)