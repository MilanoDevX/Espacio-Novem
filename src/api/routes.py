from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reservation
from api.utils import generate_sitemap, APIException
import json
import os
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime, date, timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True)

api = Blueprint('api', __name__)
CORS(api)
sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_APP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")

receiver_email = [""]


#                                                  Enviar email

def send_signup_email(receivers_email):
    message = MIMEMultipart("alternative")
    message["Subject"] = "Bienvenido a Espacio Novem!"
    message["From"] = os.getenv("SMTP_USERNAME")
    message["To"] = ",".join(receivers_email)
    html_content = """
        <html>
            <body>
                <h1>Bienvenido a Espacio Novem!</h1>
                <p>Gracias por unirte a nuestra plataforma.</p>
            </body>
        </html>
    """
    text = "Correo enviado desde la API Espacio Novem. Saludos:hola:."
    message.attach(MIMEText(text, "plain"))
    message.attach(MIMEText(html_content, "html"))
    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receivers_email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Error al enviar correo: {str(e)}")
        return False



#                                                Random password

def generate_random_password(length=10):
    chars = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password



#                                                 Reset-Password


@api.route('/send-email', methods=['PUT'])
def send_email():
   data = request.json
   receivers_email = data["email"]

 
   if isinstance(receivers_email, str):
       receivers_email = [receivers_email]
   
   user_random_password = generate_random_password()
   
   exist_user = User.query.filter_by(email=receivers_email[0]).first()
   
   if not receivers_email:
       return jsonify({"msg": "Falta ingresar email"}), 404
    
   if exist_user is None:
       return jsonify({"msg": "Usuario no registrado"}), 404
    
   exist_user.set_password(user_random_password)
   db.session.commit()

   message = MIMEMultipart("alternative")
   message["Subject"] = "Olvido de contraseña - Espacio Novem!"
   message["From"] = "aespacionovem@gmail.com"
   message["To"] = ",".join(receivers_email)

   html_content = f"""
       <html>
           <body>
               <h1>Bienvenido a Espacio Novem!</h1>
               <p>¿Olvidaste la contraseña?</p>
               <p>Tu password aleatorio es  {user_random_password}</p>
               <p>Recuerda volver a la aplicación web para continuar el cambio de contraseña</p>
           </body>
       </html>
   """
   text = "Correo enviado desde la API Espacio Novem. Saludos👋."

   message.attach(MIMEText(text, "plain"))
   message.attach(MIMEText(html_content, "html"))

   try:
       server = smtplib.SMTP(smtp_host, smtp_port)
       server.starttls()
       server.login(sender_email, sender_password)
       server.sendmail(sender_email, receivers_email, message.as_string())
       server.quit()
       return jsonify({"msg": "Correo enviado correctamente"}), 200
   except Exception as e:
       return jsonify({"msg": f"Error al enviar correo: {str(e)}"}), 500



#                                               Password recuperar


@api.route('/reset-password', methods=['PUT'])
def recuperar_password():
    data = request.json
    email = data.get("email")
    aleatoria = data.get("aleatoria")
    nueva = data.get("nueva")
    
    exist_user = User.query.filter_by(email=email).first()
   
    if exist_user is None:
        return jsonify({"msg": "Usuario no registrado"}), 401
    
    
    if not exist_user.check_password(aleatoria):
        return jsonify({"msg": "El password enviado no coincide"}), 403

    exist_user.set_password(nueva)
    db.session.commit()

    return jsonify({"msg": "Contraseña actualizada con éxito"}), 200

  


#                                                  Registro


@api.route('/signup', methods=['POST'])
def register():
    data=request.json
    name=data.get("name")
    last_name=data.get("last_name")
    email=data.get("email")
    password=data.get("password")
    telefono=data.get("telefono")
    is_admin=data.get("is_admin",False)
    exist_user=User.query.filter_by(email=email).first()
    
    if exist_user:
        return jsonify({"msg":"El usuario ya existe"}),400
    new_user=User(
        name=name,
        last_name=last_name,
        email=email,
        password=password,
        telefono=telefono,
        is_admin=is_admin
    )
    db.session.add(new_user)
    db.session.commit()
    send_signup_email([email])
    return jsonify({"message":"User crated successfully"}),201



#                                                           Login 


@api.route('/login', methods=['POST'])
def login():
    data= request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user=User.query.filter_by(email=email).first()
    print(user)
    
    if user is None:
     return jsonify({"msg": f"No existe el usuario"}), 404
    if not check_password_hash(user.password_hash, password):
     return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize()),200


#                                  Endpoint for reservations from one user 

@api.route('/reservations', methods=['GET'])
@jwt_required()
def get_reservations_by_email():
    try:
        email = get_jwt_identity()
        #email = "eliasmilano.dev@gmail.com"
        if not email:
            return jsonify({"error": "Email parameter is required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Getting current year and months
        now = datetime.now()
        current_month = now.month
        current_year = now.year
        next_month = current_month + 1 if current_month < 12 else 1
        next_month_year = current_year if current_month < 12 else current_year + 1

        # Filtering reservations by user and month/year
        reservas = db.session.query(Reservation).filter(
            Reservation.user_id == user.id,
            ((db.extract('month', Reservation.date) == current_month) & (db.extract('year', Reservation.date) == current_year)) |
            ((db.extract('month', Reservation.date) == next_month) & (db.extract('year', Reservation.date) == next_month_year))
        ).all()

        reservas_list = [item.serialize() for item in reservas]
        
        return jsonify(reservas_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#                                         Endpoint for reservations from all users


@api.route('/reservations_all', methods=['GET'])
@jwt_required()
def get_all_reservations():
    try:
        reservations_list = Reservation.query.all()
        serialized_reservations = [ item.serialize() for item in reservations_list ]
        return jsonify(serialized_reservations), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#                             Endpoint for reservations from all users (for Administrator)


@api.route('/admin', methods=['GET'])
@jwt_required()
def get_reservations_admin():
    try:
        # Obtener el email del usuario desde el token JWT
        current_user_email = get_jwt_identity()

        # Verificar si el usuario es administrador
        user = User.query.filter_by(email=current_user_email).first()
        if not user or not user.is_admin:
            return jsonify({"message": "Acceso no autorizado"}), 403

        # Calcular los rangos de fechas para los meses pasado, actual y siguiente
        today = date.today()
        first_day_current_month = date(today.year, today.month, 1)
        first_day_last_month = (first_day_current_month - timedelta(days=1)).replace(day=1)
        first_day_next_month = (first_day_current_month + timedelta(days=32)).replace(day=1)

        # Calcular el último día de cada mes
        last_day_last_month = first_day_current_month - timedelta(days=1)
        last_day_current_month = (first_day_next_month - timedelta(days=1))
        last_day_next_month = (first_day_next_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        # Filtrar las reservas por rango de fechas
        reservations_list = Reservation.query.filter(
            (Reservation.date >= first_day_last_month) & (Reservation.date <= last_day_next_month)
        ).all()

        serialized_reservations = []
        for reservation in reservations_list:
            user = User.query.get(reservation.user_id)
            if user:
                serialized_reservation = reservation.serialize()
                serialized_reservation['user_name'] = user.name
                serialized_reservation['user_last_name'] = user.last_name
                serialized_reservation['user_email'] = user.email
                serialized_reservations.append(serialized_reservation)
            else:
                serialized_reservation = reservation.serialize()
                serialized_reservation['user_name'] = "Usuario no encontrado"
                serialized_reservation['user_last_name'] = "Usuario no encontrado"
                serialized_reservation['user_email'] = "Usuario no encontrado"
                serialized_reservations.append(serialized_reservation)

        return jsonify(serialized_reservations), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400


#                          Endpoint to delete a specific reservation of a user (ID in the body)


@api.route('/reservations', methods=['DELETE'])
@jwt_required()
def delete_reservation():

    try:
        # Get the reservation ID from the request body
        data = request.get_json()
        reserva_id = data.get('reserva_id')

        if not reserva_id:
            return jsonify({"error": "Reserva ID is required"}), 400

        # Search the reservation by ID and by user ID
        reserva = Reservation.query.filter_by(id=reserva_id).first()

        if not reserva:
            return jsonify({"message": "Reserva no encontrada"}), 404

        db.session.delete(reserva)
        db.session.commit()

        return jsonify({"message": f"Reserva con ID {reserva_id} borrada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Ha ocurrido un error durante la eliminación de la reserva", "detalles": str(e)}), 500


#                                               Endpoint to save a reservation


@api.route('/reservations', methods=['POST'])
@jwt_required()
def guardar_reserva():
    reservas = request.get_json()  # Obtener el array de reservas
    email = get_jwt_identity()
    #email = "eliasmilano.dev@gmail.com"
    user = User.query.filter_by(email=email).first()
    
    if not isinstance(reservas, list):
        return jsonify({"message": "Se espera un array de reservas"}), 400

    try:
        for reserva in reservas:
            nueva_reserva = Reservation(
                user_id=user.id,
                date=reserva['date'],
                hour=reserva['hour'],
                office=reserva['office']
            )
            db.session.add(nueva_reserva)
        db.session.commit()
        return jsonify({"message": "Reservas guardadas con éxito"}), 200
    except Exception as e:
        db.session.rollback()  # Revierte la transacción en caso de error
        return jsonify({"message": f"Error al guardar las reservas: {str(e)}"}), 500



#                                                           UserPerofile


@api.route('/userProfile', methods=['GET'])
@jwt_required()
def get_user_profile():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    return jsonify(user.serialize()), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():

    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



    
    
    

