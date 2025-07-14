#%%
from flask import Flask, jsonify
from flask_cors import CORS
import csv
import os

CSV_DIR = os.path.join(os.path.dirname(__file__), 'data', 'NIBFakeDatabase.csv')

app = Flask(__name__)
CORS(app)

def load_data():
    with open(CSV_DIR, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = [row for row in csv_reader]
    return data

@app.route('/')
def index():
    return jsonify(load_data())
#%%
@app.route('/nib_num/<int:nib_num>')
def method_name(nib_num):
    print(f"Received NIB number: {nib_num}")
    with open(CSV_DIR, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if int(row['NIB Number']) == nib_num:
                return row
    return {"nibnum" : f"Could not find NIB number {nib_num}"}, 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
