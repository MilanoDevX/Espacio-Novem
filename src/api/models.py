from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    telefono = db.Column(db.String(20), unique=False, nullable=False)
    reservations = db.relationship('Reservation', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def __init__(self, name, email,last_name, password,telefono):
        self.name = name
        self.last_name=last_name
        self.email = email
        self.password = password
        self.is_active = True
        self.telefono=telefono
       

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "last_name":self.last_name,
            "email": self.email,
            "is_active":self.is_active,
            "telefono":self.telefono,
        }
    

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    hour = db.Column(db.Time, nullable=False)
    offices = db.Column(db.String(200), nullable=False)
    
    def __repr__(self):
        return f'<Reservation {self.user_id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user': self.user_id,
            'date': self.date.strftime('%Y-%m-%d'),
            'hour': self.hour.strftime('%H:%M'),
            'offices': [int(office_id) for office_id in self.offices.split(',')] if self.offices else []
        }