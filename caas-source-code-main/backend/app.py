from flask import Flask, jsonify
from flask_cors import CORS
from services.db_service import get_instances  

app = Flask(__name__)
CORS(app)  

@app.route('/api/instances', methods=['GET'])
def fetch_instances():
    return jsonify(get_instances())

if __name__ == '__main__':
    app.run(debug=True, port=5000)
