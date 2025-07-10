from flask import Flask, send_from_directory
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..\.."))
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")

app = Flask(
    __name__,
    static_folder=DIST_DIR,
    template_folder=DIST_DIR
)


@app.route('/')
def index():
    print("DIST_DIR:", DIST_DIR)
    print("index.html exists:", os.path.exists(os.path.join(DIST_DIR, "index.html")))
    return send_from_directory(app.template_folder, "index.html")

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(app.static_folder, 'assets'), filename)

@app.route('/nib_num/<int:nib_num>')
def method_name(nib_num):
    return nib_num

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
