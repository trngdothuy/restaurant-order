import os
from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv
from extensions import db
from api.menu import menu_bp
from api.orders import orders_bp
# from scripts.init_db import init_db

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=["https://15.237.118.207:3000"])

    db.init_app(app)
    
    # Home route
    @app.route('/')
    def home():
        return "Server is running!"
    
    app.register_blueprint(menu_bp, url_prefix='/api/menu')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    return app

# Only run the app if this script is the main entry point:
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
         db.create_all()
    port = int(os.environ.get("PORT", 8080))
    app.run(debug=True,host="0.0.0.0", port=port)
