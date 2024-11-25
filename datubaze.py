import sqlite3

def savienot():
  DB = sqlite3.connect('dati.db')
  return DB.cursor()

def top():
  SQL = savienot()
  SQL.execute("SELECT * FROM rezultati")
  rezultati = SQL.fetchall()
  dati = []
  for rez in rezultati:
    dati.append({
      "id":rez[0],
      "vards":rez[1],
      "klikski":rez[2],
      "laiks":rez[3],
      "datums":rez[4]
    })
  return dati

def pievienot(dati):
  ffffgvgfgggg