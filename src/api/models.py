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
    is_admin = db.Column(db.Boolean(), nullable=True, default=False) #lo necesitamos para ver la parte del admin
    
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def __init__(self, name, email,last_name, password,telefono, is_admin):
        self.name = name
        self.last_name=last_name
        self.email = email
        self.password = password
        self.is_active = True
        self.telefono=telefono
        self.is_admin = is_admin
       

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "last_name":self.last_name,
            "email": self.email,
            "is_active":self.is_active,
            "telefono":self.telefono,
            "is_admin":self.is_admin,
            # do not serialize the password, its a security breach
        }
        
   
#ESTO PUEDE SER PARA LA VISTA DE RESERVAS DE CONSULTORIO POR USUARIO?

# class Cita(db.Model):  # Renamed to Cita (Appointment)
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
#     consultorio_id = db.Column(db.Integer, db.ForeignKey("consultorio.id"), nullable=False)  # Room/Consultancy
#     start_time = db.Column(db.Time, nullable=False)
#     end_time = db.Column(db.Time, nullable=False)
#     total_price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
#     fecha_cita = db.Column(db.Date, nullable=False)  # Date of the appointment
#     status = db.Column(db.String(20), default="Scheduled") # Add status field


#     user = db.relationship("User", back_populates="citas")
#     consultorio = db.relationship("Consultorio", back_populates="citas")
#     service = db.relationship("Servicio", back_populates="citas")

#     def __repr__(self):
#         return f'<Cita {self.id}>'

#     def calculate_total_price(self):
#         # Implement your pricing logic here.  Example:
#         service_price = self.service.price or 0
#         # ... other factors (duration, etc.)
#         return service_price  # Example

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user": self.user.serialize() if self.user else None,
#             "consultorio": self.consultorio.serialize() if self.consultorio else None,
#             "start_time": self.start_time.strftime("%H:%M") if self.start_time else None, # Format time
#             "end_time": self.end_time.strftime("%H:%M") if self.end_time else None, # Format time
#             "total_price": str(self.total_price),
#             "fecha_cita": self.fecha_cita.isoformat(),
#             "status": self.status,
          
#         }


# # Example Consultorio model:
# class Consultorio(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), nullable=False)
#     # ... other room details

#     citas = db.relationship("Cita", back_populates="consultorio")

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             # ... other details
#         }

# # Example Servicio model:
# class Servicio(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), nullable=False)
#     price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
#     # ... other service details

#     citas = db.relationship("Cita", back_populates="service")

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "price": str(self.price),
#             # ... other details
#         }