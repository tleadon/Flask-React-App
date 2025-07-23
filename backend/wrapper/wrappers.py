from functools import wraps
from models.user import User
from flask import request, jsonify

def require_api_key(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization', '')
        if not auth.startswith("Bearer "):
            return jsonify({'message': 'Missing API key.'}), 401

        api_key = auth.split(" ")[1]
        user = User.query.filter_by(api_key=api_key).first()
        if not user:
            return jsonify({'message': 'Invalid API key.'}), 403
        return func(*args, **kwargs)
    return wrapper