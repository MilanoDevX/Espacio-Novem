from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False) 
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(25), nullable=False)
    telefono = db.Column(db.String(20), nullable=False) 
    is_admin = db.Column(db.Boolean, default=False)

    def __init__(self, name, last_name, email, password, telefono, is_admin=False):
        self.name = name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.telefono = telefono
        self.is_admin = is_admin

    
    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "last_name":self.last_name,
            "email": self.email,
            "telefono":self.telefono,
            # do not serialize the password, its a security breach
        }

        
 #Admin, ve reserva, crea y elimina.
 

class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    consultorio = db.Column(db.String(100))
    date = db.Column(db.Date)
    time = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('reservations', lazy=True))
    
    def __init__(self, consultorio, date, time, user_id):
        self.consultorio = consultorio
        self.date = date
        self.time = time
        self.user_id = user_id

    def serialize(self):
        return {
            'id': self.id,
            'consultorio': self.consultorio,
            'date': self.date,
            'time': self.time,
            'user_id': self.user_id
        }
