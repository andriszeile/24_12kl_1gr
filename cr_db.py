import sqlite3

db = sqlite3.connect('dati.db')
sql = db.cursor()
sql.execute("""CREATE TABLE rezultati (
            id INTEGER NOT NULL UNIQUE,
            vards TEXT,
            klikski INTEGER,
            laiks INTEGER,
            datums TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
            )""")
db.close()