from model import db, User, Appointment, connect_to_db
from datetime import datetime

# A user can have many appointments.
# One appointment (a specific time) cant have many users.
# Only one user is allowed during an appointment time.
# It is a one to many rel.

# ------------------------------------------------------------------------#

def create_user(username):
    """Create new user"""
    new_user = User(username=username)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def login_user(username):
    """User logs in"""
    return User.query.filter_by(username=username).first()

def get_user_by_id(user_id):
    """Return a user by primary key."""
    return User.query.get(user_id)

def get_user_by_username(username):
    """Return user by username"""
    return User.query.filter(User.username == username).first()

# ------------------------------------------------------------------------#

# future thought: save error and success as msg and use const [message, setMessage] = useState("")


def schedule_appointment(user_id, date, time):
    """A User schedules an appointment"""
    # if available/bool false + booked/bool true -> cannot sch appt
    # if available/bool true + booked/bool false -> can sch appt
    # if time is booked on selected date, user can still book other times on that date

    # in try block, query check if appt exists
    # if not an existing appt, return error msg
    try:
        appointment = Appointment.query.filter_by(date=date, time=time).first()
        if not appointment:
            return {"error": "Appointment doesn't exist."}

        # if appt is not avail meaning appt is booked, show/query avail appt slots on the same date
        if appointment.available is False and appointment.booked is True:
            available_slots = Appointment.query.filter(
                date=date, available=True, booked=False
            ).all()

            if available_slots: # if we are showing avail slots, tell user their slot isnt avail
                return {
                    "error": "Time slot not available.",
                    "message": "Other available time slots on this date:",
                    "available_slots": [slot.time.strftime("%H:%M") for slot in available_slots],
                }
            else:
                return {"error": f"No appointments available on this date: {date}"}

        # if appointment.available is True and appointment.booked is False:
        else:  # Create a new appointment
            if appointment.available is True and appointment.booked is False:
                new_appointment = Appointment(
                    user_id=user_id,
                    date=date,
                    time=time,
                    available=False,
                    booked=True,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                )

                # existing appt unavailable to prevent double booking if multiple users on same time
                appointment.available = False
                db.session.add(new_appointment)
                db.session.commit()

            else:
                return {"success": "Appointment scheduled."}

    except Exception as e:
        db.session.rollback()
        return {"error": f"Error occurred while scheduling: {str(e)}"}


def get_appointments(user_id):
    """Return appointments of users by user_id"""
    return Appointment.query.filter_by(user_id=user_id).all()

def get_existing_reservations(date, time):
    """Return reservations / booked appointments
    pulling frm db, has to be from appointment obj"""
    return Appointment.query.filter_by(date=date, time=time).first()

def get_appointment_slot(date, time, id=None):
    """Return reservations / booked appointments without editing key id"""
    appointment = Appointment.query.filter_by(date=date, time=time)
    if id:
        appointment = appointment.filter(Appointment.appointment_id != id)
    return not appointment.first()

def get_appointments_by_username(username):
    """Return appointments of user by username"""
    return Appointment.query.filter_by(Appointment.username == username).first()

def get_appointment_slots_by_date(date):
    """Return appointment slot times based on date input"""
    return Appointment.query.filter(date=date, available=True, booked=False).all()

def get_appointment_by_id(appointment_id):
    """Return appointment based on appointment_id"""
    return Appointment.query.get(appointment_id)

def update_appt(appointment):
    """Update appointment(s)"""
    db.session.commit()

def delete_appt(user_id, appointment_id):
    """Delete appointment(s)"""
    appointment_to_delete = Appointment.query.filter_by(user_id=user_id, appointment_id=appointment_id).first()
    print(f"Appointment deleted:", appointment_to_delete)
    db.session.delete(appointment_to_delete)
    db.session.commit()
    print(f"Appointment {appointment_id} removed from User {user_id}")
    return

# ------------------------------------------------------------------------#
if __name__ == "__main__":
    from server import app

    connect_to_db(app)
    db.create_all()
