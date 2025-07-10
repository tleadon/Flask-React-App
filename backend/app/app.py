from flask import Flask, render_template, request, jsonify
app = Flask(__name__)


@app.route('/')
def index():
    employees = [
        {'id': 1, 'name': 'John Doe', 'position': 'Software Engineer'},
        {'id': 2, 'name': 'Jane Smith', 'position': 'Project Manager'},
        {'id': 3, 'name': 'Alice Johnson', 'position': 'Data Scientist'}
    ]
    return jsonify(employees)

@app.route('/nib_num/<int:nib_num>')
def method_name(nib_num):
    return hi

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
 