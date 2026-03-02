from flask import Flask
from flask_cors import CORS
from routes.query_routes import query_bp

app = Flask(__name__)
CORS(app)  # React ke liye important

# Register routes
app.register_blueprint(query_bp, url_prefix="/api")

@app.route("/")
def health():
    return {"status": "Flask backend running"}

if __name__ == "__main__":
    app.run(debug=True)
