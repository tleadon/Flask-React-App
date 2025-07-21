from flask import Blueprint, request, jsonify
from models.user import db, User
from wrapper.wrappers import require_api_key
import json

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing fields'}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'User already exists'}), 409

    user = User(username=data['username'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'New user registered!'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        loginresult = {
            'message' : 'Login successful.',
            'api_key': user.api_key
        }
        return jsonify(loginresult), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/protected', methods=['GET'])
@require_api_key
def protected():
    print("Accessing protected route...")
    return jsonify({'message': 'You have access!'}), 200