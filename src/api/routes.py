from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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


# Registro

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

#Login 

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

#Perfil 
@api.route('/userProfile', methods=['GET'])
@jwt_required()
def get_user_profile():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    return jsonify(user.serialize()), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200