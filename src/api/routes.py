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
from datetime import datetime

app = Flask(__name__)
CORS(app)
api = Blueprint('api', __name__)
CORS(api)
sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_APP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")
receiver_email = ["fiorellaviscardi.2412@gmail.com"]
# Enviar email
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
# Random password
def generate_random_password(length=10):
    chars = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password
# Password recuperar
@api.route('/reset-password', methods=['PUT'])
def recuperar_password():
    data = request.json
    email = data.get("email")
    nueva = data.get("nueva")
    aleatoria = data.get("aleatoria")
    if not email:
        return jsonify({"status": "error", "message": "Falta ingresar email"}), 404
    exist_user = User.query.filter_by(email=email).first()
    if not exist_user:
        return jsonify({"status": "error", "message": "Usuario no registrado"}), 404
    if aleatoria != exist_user.password:
        return jsonify({"status": "error", "message": "El código aleatorio no coincide"}), 403
    exist_user.password = generate_password_hash(nueva)
    db.session.commit()
    return jsonify({"msg":"Contraseña actualizada con exito"}),200
    return jsonify({"msg":"Paso algo inesperado"}),500
@api.route('/signup', methods=['POST'])
def register():
    data=request.json
    name=data.get("name")
    last_name=data.get("last_name")
    email=data.get("email")
    password=data.get("password")
    telefono=data.get("telefono")
    exist_user=User.query.filter_by(email=email).first()
    if exist_user:
        return jsonify({"msg":"El usuario ya existe"}),400
    new_user=User(
        name=name,
        last_name=last_name,
        email=email,
        password=password,
        telefono=telefono
    )
    db.session.add(new_user)
    db.session.commit()
    send_signup_email([email])
    return jsonify({"message":"User crated successfully"}),201
@api.route('/login', methods=['POST'])
def login():
    data= request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user=User.query.filter_by(email=email).first()
    print(user)
    if user is None:
        return jsonify({"msg": f"No existe el usuario"}), 404
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize()),200


# Endpoint for reservations from one user 
@api.route('/reservations', methods=['GET'])
#@jwt_required()
def get_reservations_by_email():
    try:
        #email = get_jwt_identity()
        email = "eliasmilano.dev@gmail.com"
        if not email:
            return jsonify({"error": "Email parameter is required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Obteining current year and months
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


# Endpoint for reservations from all users
@api.route('/reservations_all', methods=['GET'])
#@jwt_required()
def get_all_reservations():
    try:
        reservations_list = Reservation.query.all()
        serialized_reservations = [ item.serialize() for item in reservations_list ]
        return jsonify(serialized_reservations), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Endpoint for reservations from all users (for Administrator)
@api.route('/reservations_admin', methods=['GET'])
#@jwt_required()
def get_reservations_admin():
    try:
        reservations_list = Reservation.query.all()
        serialized_reservations = []
        for reservation in reservations_list:
            user = User.query.get(reservation.user_id)  # get user from the reservation
            if user:
                serialized_reservation = reservation.serialize()
                serialized_reservation['user_name'] = user.name
                serialized_reservation['user_last_name'] = user.last_name
                serialized_reservation['user_email'] = user.email
                serialized_reservations.append(serialized_reservation)
            else:
                # If user is not found
                serialized_reservation = reservation.serialize()
                serialized_reservation['user_name'] = "Usuario no encontrado"
                serialized_reservation['user_last_name'] = "Usuario no encontrado"
                serialized_reservation['user_email'] = "Usuario no encontrado"
                serialized_reservations.append(serialized_reservation)

        return jsonify(serialized_reservations), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Endpoint to delete a specific reservation of a user (ID in the body)
@api.route('/reservations', methods=['DELETE'])
# @jwt_required()
def delete_reservation():
    # email = get_jwt_identity()
    email = "eliasmilano.dev@gmail.com"

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        # Get the reservatiod ID from the request body
        data = request.get_json()
        reserva_id = data.get('reserva_id')

        if not reserva_id:
            return jsonify({"error": "Reserva ID is required"}), 400

        # Search the reservation by ID and by user ID
        reserva = Reservation.query.filter_by(id=reserva_id, user_id=user.id).first()

        if not reserva:
            return jsonify({"message": "Reserva no encontrada"}), 404

        db.session.delete(reserva)
        db.session.commit()

        return jsonify({"message": f"Reserva con ID {reserva_id} borrada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Ha ocurrido un error durante la eliminación de la reserva", "detalles": str(e)}), 500










