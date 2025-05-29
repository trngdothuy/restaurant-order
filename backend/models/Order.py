from extensions import db
from datetime import datetime

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    table_number = db.Column(db.String(10), nullable=False)
    items = db.Column(db.Text, nullable=False) # JSON String
    total_price = db.Column(db.Float)
    status = db.Column(db.String(50), default='pending')
    create_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    