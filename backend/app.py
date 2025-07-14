from flask import Flask, send_from_directory
from flask_cors import CORS
import csv
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")
CSV_DIR = os.path.join(BASE_DIR, "backend", "data", "NIBFakeDatabase.csv")

app = Flask(
    __name__,
    static_folder=DIST_DIR,
    template_folder=DIST_DIR
)
CORS(app)

@app.route('/')
def index():
    print("DIST_DIR:", DIST_DIR)
    print("index.html exists:", os.path.exists(os.path.join(DIST_DIR, "index.html")))
    print("CSV_DIR:", CSV_DIR)
    return send_from_directory(app.template_folder, "index.html")

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(app.static_folder, 'assets'), filename)

@app.route('/nib_num/<int:nib_num>')
def method_name(nib_num):
    print(f"Received NIB number: {nib_num}")
    with open(CSV_DIR, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if int(row['NIB Number']) == nib_num:
                return row
    return {"nibnum" : nib_num}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
