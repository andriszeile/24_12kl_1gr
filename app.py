from flask import Flask, render_template, request, jsonify
import json
import os

app = flask(__name__)
DATA_FILE = "data.json"

#JSON faila ielāde un inicalizācija
def load_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

#Datu saglabāšana JSON failā
def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

#mājaslapas palaišana
@app.route("/")
def index():
    return render_template("index.html")

#API - nolasa visus ierakstus
@app.route("/api/data")
def get_data():
    data = load_data()
    return jsonify(data)

#API - pievieno jaunu ierakstu

#test


if __name__ == "__main__":
    app.run(debug=True)