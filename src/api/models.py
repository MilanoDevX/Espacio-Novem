from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    telefono = db.Column(db.String(20), nullable=False) 
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, unique=False, nullable=False)
    reservations = db.relationship('Reservation', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'
    def __init__(self, name, last_name, email, password, telefono, is_admin=False):
        self.name = name
        self.last_name = last_name
        self.email = email
        self.set_password(password)
        self.telefono = telefono
        self.is_admin = is_admin
        self.is_active = True
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
       
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "telefono": self.telefono,
            "is_active": self.is_active,
            "is_admin": self.is_admin,            
        }



class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    hour = db.Column(db.Time, nullable=False)
    office = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return f'<Reservation {self.user_id}>'
    def __init__(self, user_id, date, hour, office):
        self.user_id = user_id
        self.date = date
        self.hour = hour
        self.office = office
        
    def serialize(self):
        return {
            'id': self.id,
            'user': self.user_id,
            'date': self.date.strftime('%Y-%m-%d'),
            'hour': self.hour.strftime('%H:%M'),
            'office': self.office
        }