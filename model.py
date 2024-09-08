"""Data models for Scheduling Reservations app"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ------------------------------------------------------------------------#


class User(db.Model):
    """A User"""

    __tablename__ = "users"
    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    appointments = db.relationship("User_Appointment", back_populates="user")

    def __repr__(self):
        """Show user info."""
        return f"<User user_id={self.user_id} username={self.username}>"


class Appointment(db.Model):
    """An Appointment"""

    __tablename__ = "appointments"
    appointment_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    date = db.Column(db.Date)
    time = db.Column(db.DateTime)
    available = db.Column(db.Boolean, default=True)
    booked = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    users = db.relationship("UserAppointment", back_populates="appointment")

    def __repr__(self):
        """Show user info."""
        return f"<User user_id={self.user_id} username={self.username}>"


class UserAppointment:
    """A User's Appointment"""

    __tablename__ = "user_appointments"
    user_appointment_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))
    appointment_id = db.Column(db.Integer, db.ForeignKey("appointment.appointments_id"))

    user = db.relationship("User", back_populates="appointments")
    appointment = db.relationship("Appointment", back_populates="users")


# ------------------------------------------------------------------------#
def connect_to_db(app):
    """Connect to database."""

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///reservations"
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)
    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
