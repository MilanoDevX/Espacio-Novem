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

app = Flask(__name__)
CORS(app)


api = Blueprint('api', __name__)
CORS(api)

aleatorio = ""
sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_APP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")

receiver_email = ["fiorellaviscardi.2412@gmail.com"]

# Enviar enmail
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
    text = "Correo enviado desde la API Espacio Novem. Saludos👋."

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

# Signup
@api.route('/signup', methods=['POST'])
def register():
    data = request.json
    print("Datos recibidos en /signup:", data)

    name = data.get("name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    telefono = data.get("telefono")
    is_admin = data.get("is_admin", False)

    if not all([name, last_name, email, password, telefono]) or is_admin is None:
        return jsonify({"status": "error", "message": "Todos los campos son obligatorios"}), 400

    exist_user = User.query.filter_by(email=email).first()
    if exist_user:
        return jsonify({"status": "error", "message": "El usuario ya existe"}), 400

    try:
        new_user = User(
        name=name,
        last_name=last_name,
        email=email,
        password=generate_password_hash(password),  # Encriptar la contraseña
        telefono=telefono,
        is_admin=is_admin,
        is_active=True
        )

        db.session.add(new_user)
        db.session.commit()
        print("Usuario creado exitosamente:", new_user.serialize())

        if send_signup_email([email]):
            return jsonify({"status": "success", "message": "Usuario creado exitosamente"}), 201
        else:
            db.session.rollback()
            return jsonify({"status": "error", "message": "Usuario creado, pero no se pudo enviar el correo de bienvenida"}), 500

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": "Hubo un problema al crear el usuario"}), 500


# Login 
@api.route("/login", methods=["POST"])
def login():
    try:
        if not request.is_json:
            return jsonify({"status": False, "error": "El request debe ser JSON"}), 400
        
        data = request.get_json()  
        print("Datos recibidos:", data)  

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"status": False, "error": "Faltan datos"}), 400

        # Buscar usuario en la base de datos
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"status": False, "error": "Usuario no encontrado"}), 401

        # Verificar la contraseña
        if not check_password_hash(user.password, password):
            return jsonify({"status": False, "error": "Credenciales incorrectas"}), 401

        # Generar token de acceso
        access_token = create_access_token(identity=user.email)

        return jsonify({
            "status": True,
            "message": "Login exitoso",
            "user": {
                "email": user.email,
                "is_admin": user.is_admin
            },
            "access_token": access_token
        }), 200

    except Exception as e:
        print("Error en el servidor:", e)
        return jsonify({"status": False, "error": "Error en el servidor"}), 500


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

    if exist_user.password != aleatoria:
        return jsonify({"status": "error", "message": "El password enviado no coincide"}), 403

    exist_user.password = generate_password_hash(nueva)
    db.session.commit()

    return jsonify({"status": "success", "message": "Contraseña actualizada con éxito"}), 200

# Profile 
@api.route('/userProfile', methods=['GET'])
@jwt_required()
def get_user_profile():
    try:

        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
     
        if not user:
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
        
        
        return jsonify(user.serialize()), 200
    
    except Exception as e:
       
        print(f"Error al obtener el perfil del usuario: {str(e)}")
        return jsonify({"status": "error", "message": "Hubo un error en el servidor"}), 500


