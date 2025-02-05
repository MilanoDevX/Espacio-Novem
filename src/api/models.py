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
            # do not serialize the password, its a security breach
        }