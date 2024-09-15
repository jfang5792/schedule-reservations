"""Data models for Reservation Scheduling app"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# ------------------------------------------------------------------------#
class User(db.Model):
    """A User"""

    __tablename__ = "users"
    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    appointment = db.relationship("Appointment", back_populates="user")

    def __repr__(self):
        """Show user info."""
        return f"<User user_id:{self.user_id} username:{self.username}>"


class Appointment(db.Model):
    """An Appointment"""

    __tablename__ = "appointments"
    appointment_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    date = db.Column(db.Date)  # date(2024, 9, 12) Represents September 12, 2024
    time = db.Column(db.Time)  # (time) 14:30:00
    # appt = Appointment(datetime(2024, 9, 12, 14, 30))  # September 12, 2024, at 2:30 PM
    available = db.Column(db.Boolean, default=True)
    booked = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    user = db.relationship("User", back_populates="appointment")

    def __repr__(self):
        """Show appointment info."""
        return f"<Appointment appointment_id:{self.appointment_id} of {self.user.username} (user_id:{self.user_id}) on date: {self.date} at {self.time}>"


# ------------------------------------------------------------------------#
def connect_to_db(app):
    """Connect to database."""

    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///reservations"
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)
    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
