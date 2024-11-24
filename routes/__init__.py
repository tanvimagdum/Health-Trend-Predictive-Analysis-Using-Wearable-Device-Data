from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Import routes
    from . import trends, sleepPatterns, heartrateFluctuations
    app.register_blueprint(trends.bp)
    app.register_blueprint(sleepPatterns.bp)
    app.register_blueprint(heartrateFluctuations.bp)

    return app