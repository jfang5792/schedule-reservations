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
            msg = f"Username <{username}> already exists. Log in."
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
        return jsonify({"msg": "Error during registration", "status": "Error"}), 500




# ---------------------------------------------------------------------#
if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6005)
