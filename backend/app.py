from flask import Flask, jsonify, Blueprint, request, send_from_directory
from config import Config
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_swagger_ui import get_swaggerui_blueprint
from models.user import db
from auth.auth import auth_bp
from wrapper.wrappers import require_api_key
import csv, json

#region App Setup

app = Flask(__name__, static_url_path='/static')
app.config.from_object(Config)
db.init_app(app)
CORS(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

swaggerui_blueprint = get_swaggerui_blueprint(
    Config.SWAGGER_URL,
    Config.API_URL,
    config={
        'app_name': "NIB Number API"
    }
)

#endregion App Setup

#region Blueprints
app.register_blueprint(swaggerui_blueprint, url_prefix=Config.SWAGGER_URL)
app.register_blueprint(auth_bp)
#endregion Blueprints

#region App Lifecycle Stuff
@app.before_request
def create_tables():
    db.create_all()

def load_data():
    with open(Config.CSV_DIR, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = [row for row in csv_reader]
    return data
#endregion App Lifecycle Stuff

#region Routes
@app.route('/nib_num')
@require_api_key
def index():
    return jsonify(load_data())

#region Protected Routes

@app.route('/nib_num/<int:nib_num>')
@require_api_key
def method_name(nib_num):
    print(f"Received NIB number: {nib_num}")
    with open(Config.CSV_DIR, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if int(row['NIB Number']) == nib_num:
                return row
    return {"nibnum" : f"Could not find NIB number {nib_num}"}, 404

#endregion Protected Routes

@app.route('/static/swagger.json')
def serve_swagger_json():
    print("Serving Swagger JSON")
    with open('static/swagger.json', 'r') as f:
        return jsonify(json.load(f))

@app.route('/documentation/<path:filename>')
def swagger_ui_files(filename):
    print(f"Serving Swagger UI file: {filename}")
    return send_from_directory('documentation', filename)

#endregion Routes

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
