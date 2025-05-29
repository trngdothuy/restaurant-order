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
    CORS(app)

    db.init_app(app)

    app.register_blueprint(menu_bp, url_prefix='/api/menu')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    return app

# Only run the app if this script is the main entry point:
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
         db.create_all()
    app.run(debug=True)
