"""Server for Reservation Scheduling app"""

from flask import Flask, jsonify, request, redirect, session
import crud as crud
from model import db, connect_to_db
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = 'dev'

# ---------------------------------------------------------------------#
@app.route("/api/register", methods=["POST"])
def register():
    """Register as new user"""
    try:
        username = request.json.get("username")
        user = crud.get_user_by_username(username)
        print("username:", username)

        if not username:
            return jsonify({"msg": "Username required", "status": "Error"}), 400

        if user:
            msg = f"Username {username} already exists. Sign in."
            status = "Error"
            return jsonify({"msg": msg, "status": status}), 409
        else:
            user = crud.create_user(username)
            db.session.add(user)
            db.session.commit()

            session["user"] = user.username
            msg = "Account created."
            status = "Ok"
            response = {"msg": msg, "status": status, "username": username}
            print(f"Sending response: {response}")
            return jsonify(response), 201

    except Exception as e:
        print(f"Error in registration: {str(e)}")
        return jsonify({"msg": "There was a problem during registration", "status": "Error"}), 500


@app.route("/api/login", methods=["POST"])
def login():
    """Log in as user"""
    try:
        data = request.json
        print("Login info ->", data)
        username = request.json.get("username")
        user = crud.get_user_by_username(username)

        if not user or user.username != username:
            return jsonify({
                    "msg": "Username not found. Try again or register a new account.",
                    "status": "Error",
                }), 401  # failed login error code

    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"status": "Error", "msg": str(e)}), 500





# ---------------------------------------------------------------------#
if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6005)
