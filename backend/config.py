import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret-key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Configure Swagger UI
    SWAGGER_URL = '/documentation'  # URL for Swagger UI 
    API_URL = '/static/swagger.json' # Path to your OpenAPI/Swagger JSON file
    CSV_DIR = os.path.join(os.path.dirname(__file__), 'data', 'NIBFakeDatabase.csv')

