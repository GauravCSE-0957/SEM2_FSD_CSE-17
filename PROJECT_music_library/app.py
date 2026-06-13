from flask import Flask, render_template, request, jsonify
from database import get_db, create_tables

app = Flask(__name__)
create_tables()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/add_song", methods=["POST"])
def add_song():
    data = request.json
    db = get_db()
    db.execute(
        "INSERT INTO songs (title, artist, url) VALUES (?, ?, ?)",
        (data["title"], data["artist"], data["url"])
    )
    db.commit()
    db.close()
    return jsonify({"message": "Song added successfully"})

@app.route("/search")
def search():
    q = request.args.get("q")
    db = get_db()
    rows = db.execute(
        "SELECT * FROM songs WHERE title LIKE ? OR artist LIKE ?",
        (f"%{q}%", f"%{q}%")
    ).fetchall()
    db.close()

    return jsonify([
        {
            "id": r[0],
            "title": r[1],
            "artist": r[2],
            "url": r[3],
            "fav": r[4]
        }
        for r in rows
    ])

@app.route("/favorite/<int:id>")
def favorite(id):
    db = get_db()
    db.execute("UPDATE songs SET is_favorite = 1 WHERE id = ?", (id,))
    db.commit()
    db.close()
    return jsonify({"message": "Added to Library"})

@app.route("/library")
def library():
    db = get_db()
    rows = db.execute(
        "SELECT * FROM songs WHERE is_favorite = 1"
    ).fetchall()
    db.close()

    return jsonify([
        {"title": r[1], "url": r[3]}
        for r in rows
    ])

if __name__ == "__main__":
    app.run(debug=True)
