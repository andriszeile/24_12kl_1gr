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

# Mājas lapa ar datu ievades formu un datu tabulu
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        date = request.form.get("date")
        min_temp = request.form.get("min_temp")
        max_temp = request.form.get("max_temp")

        # Validācija
        if not date or not min_temp or not max_temp:
            return "Visi lauki ir obligāti!", 400
        
        try:
            min_temp = float(min_temp)
            max_temp = float(max_temp)
        except ValueError:
            return "Temperatūrai jābūt skaitlim!", 400

        # Saglabāt ierakstu
        data = load_data()
        data.append({"date": date, "min_temp": min_temp, "max_temp": max_temp})
        save_data(data)

    # Datu ielāde un vidējās temperatūras aprēķins
    data = load_data()
    avg_temp = (
        sum((entry["min_temp"] + entry["max_temp"]) / 2 for entry in data) / len(data)
        if data else 0
    )

    return render_template("index.html", data=data, avg_temp=avg_temp)

if __name__ == "__main__":
    app.run(debug=True)
