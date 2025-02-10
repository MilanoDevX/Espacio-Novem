"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
import os
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

app = Flask(__name__)
CORS(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_APP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

def generate_random_password(length=10):
    chars = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

@api.route('/send-email', methods=['PUT'])
def send_email():
    data = request.json
    receivers_email = data.get("email")
    user_random_password = generate_random_password()

    if not receivers_email:
        return jsonify({"msg": "Falta ingresar email"}), 400

    exist_user = User.query.filter_by(email=receivers_email).first()

    if not exist_user:
        return jsonify({"msg": "Usuario no registrado"}), 404

    exist_user.password = user_random_password
    db.session.commit()

    message = MIMEMultipart("alternative")
    message["Subject"] = "Olvido de contraseña - Espacio Novem"
    message["From"] = sender_email
    message["To"] = receivers_email

    html_content = f"""
        <html>
            <body>
                <h1>Bienvenido a Espacio Novem !</h1>
                <p>¿Olvidaste la contraseña?</p>
                <p>Tu password aleatorio es: <strong>{user_random_password}</strong>.</p>
                <p>Recuerda volver a la aplicación web para continuar el cambio de contraseña.</p>
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
        server.sendmail(sender_email, [receivers_email], message.as_string())
        server.quit()
        return jsonify({"msg": "Correo enviado correctamente"}), 200
    except Exception as e:
        return jsonify({"msg": f"Error al enviar correo: {str(e)}"}), 500

@api.route('/signup', methods=['POST'])  # <-- Ruta definida como '/signup'
def register():
    data = request.json
    name = data.get("name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    telefono = data.get("telefono")

    if not all([name, last_name, email, password, telefono]):
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    exist_user = User.query.filter_by(email=email).first()
    if exist_user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(
        name=name,
        last_name=last_name,
        email=email,
        password=password,
        telefono=telefono
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize()), 200
