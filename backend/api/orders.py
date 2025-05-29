from flask import Blueprint, request, jsonify
from models.Order import Order
from extensions import db
import numpy as np
import json

orders_bp = Blueprint('orders', __name__)

# Create a new order
@orders_bp.route('/', methods=['POST'], strict_slashes=False)
def place_order():
    if not request.is_json:
        return jsonify({"error": "Missing or invalid JSON"}), 400
    data = request.get_json()
    print("Received new order", data)
    
    table_number = data.get('table_number')
    items = json.dumps(data.get('items'))
    total_price = data.get('total_price')
    
    if not table_number or not items or not total_price:
        return jsonify({'error': 'Missing required fields'}), 400
    
    
    new_order = Order(
        table_number = table_number,
        items=items, # a json list or string
        total_price = total_price,
        status = 'pending'
    )
    
    db.session.add(new_order)
    db.session.commit()
    
    return jsonify({
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "table_number": new_order.table_number,
        "items": json.loads(new_order.items),
        "total_price": new_order.total_price,
        "status": new_order.status
    }), 201

# Get all orders
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

# Get 1 order by ID
@orders_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    
    order_data = {
        'id': order.id,
        'table_number': order.table_number,
        'items': order.items,
        'total_price': order.total_price,
        'status': order.status
    }
    return jsonify(order_data)

# Update order status
@orders_bp.route('/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    new_status = data.get('status')
    if not new_status:
        return jsonify({'error': 'Missing status field'}), 400
    
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    
    order.status = new_status
    db.session.commit()
    return jsonify({'message': f'Order {order_id} status updated to {new_status}'})