from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = "data.json"

# Palīgfunkcija, lai ielādētu vai inicializētu JSON failu
def load_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

# Palīgfunkcija, lai saglabātu datus JSON failā
def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# Mājas lapa
@app.route("/")
def index():
    return render_template("index.html")

# API, lai iegūtu visus ierakstus
@app.route("/api/data", methods=["GET"])
def get_data():
    data = load_data()
    return jsonify(data)

# API, lai pievienotu jaunu ierakstu
@app.route("/api/data", methods=["POST"])
def add_data():
    request_data = request.json
    date = request_data.get("date")
    min_temp = request_data.get("min_temp")
    max_temp = request_data.get("max_temp")

    # Validācija
    if not date or min_temp is None or max_temp is None:
        return jsonify({"error": "Visi lauki ir obligāti!"}), 400

    try:
        min_temp = float(min_temp)
        max_temp = float(max_temp)
    except ValueError:
        return jsonify({"error": "Temperatūrai jābūt skaitlim!"}), 400

    # Saglabāt ierakstu
    data = load_data()
    data.append({"date": date, "min_temp": min_temp, "max_temp": max_temp})
    save_data(data)

    return jsonify({"message": "Dati saglabāti veiksmīgi!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
