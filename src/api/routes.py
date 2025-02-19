from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Reservation
from flask_cors import CORS
import os
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

api = Blueprint('api', __name__)
CORS(api)


aleatorio=""
sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_APP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")

# receivers_email = "fiorellaviscardi.2412@gmail.com", "natimartalvarez@gmail.com", "eliasmilano@gmail.com"


# Función para enviar correo de bienvenida
def send_signup_email(receivers_email):
    if not sender_email or not sender_password or not smtp_host or not smtp_port:
        print("Faltan variables de entorno necesarias para la conexión SMTP.")
        return False

    try:
       
        message = MIMEMultipart()
        message["Subject"] = "Bienvenido a Espacio Novem!"
        message["From"] = sender_email
        message["To"] = ",".join(receivers_email)

        # Cuerpo del mensaje en texto y HTML
        html_content = """
            <html>
                <body>
                    <h1>Bienvenido a Espacio Novem!</h1>
                    <p>¿Olvidaste la contraseña?</p>
                    <p>Por favor, ingresa el correo electrónico que usas en la aplicación para continuar.</p>
                </body>
            </html>
        """
        text = "Correo enviado desde la API Espacio Novem. Saludos👋."
        message.attach(MIMEText(text, "plain"))
        message.attach(MIMEText(html_content, "html"))

      
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receivers_email, message.as_string())
        
        print("Correo enviado exitosamente.")
        return True

    except smtplib.SMTPAuthenticationError as e:
        print(f"Error de autenticación SMTP: {str(e)}")
    except smtplib.SMTPConnectError as e:
        print(f"Error al conectar con el servidor SMTP: {str(e)}")
    except smtplib.SMTPException as e:
        print(f"Error SMTP general: {str(e)}")
    except Exception as e:
        print(f"Error inesperado al enviar el correo: {str(e)}")
    
    return False


# Generar contraseña aleatoria
def generate_random_password(length=10):
    chars = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password



# Registro de usuario

@api.route('/signup', methods=['POST'])
def register():
    data = request.json
    
    print(data)  
    
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
            password=password,
            telefono=telefono,
            is_admin=is_admin,
            is_active=True  
        )

        db.session.add(new_user)
        db.session.commit()

        # Enviar correo de bienvenida
        if send_signup_email([email]):
            return jsonify({"status": "success", "message": "Usuario creado exitosamente"}), 201
        else:
          
            db.session.rollback()  
            return jsonify({"status": "error", "message": "Usuario creado, pero no se pudo enviar el correo de bienvenida"}), 500

    except Exception as e:
        db.session.rollback()
        print(f"Error al registrar usuario: {str(e)}")
        return jsonify({"status": "error", "message": "Hubo un problema al crear el usuario"}), 500


# Login de usuario

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"status": "error", "message": "No existe el usuario"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"status": "error", "message": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize()), 200


# Recuperar contraseña
@api.route('/recuperar-password', methods=['PUT'])
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

    exist_user.password = generate_password_hash(nueva, method='sha256')
    db.session.commit()

    return jsonify({"status": "success", "message": "Contraseña actualizada con éxito"}), 200

# Rutas de reservas protegidas
@api.route("/reservations", methods=["GET"])
@jwt_required()
def get_reservations():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user and not user.is_admin:
        return jsonify({"status": "error", "message": "Acceso denegado"}), 403

    reservations = Reservation.query.all()
    return jsonify([reservation.serialize() for reservation in reservations])

# Crear una nueva reserva
@api.route("/reservations", methods=["POST"])
@jwt_required()
def create_reservation():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user and not user.is_admin:
        return jsonify({"status": "error", "message": "Acceso denegado"}), 403

    data = request.json
    new_reservation = Reservation(
        consultorio=data["consultorio"],
        date=data["date"],
        time=data["time"],
        user=data["user"]
    )
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify(new_reservation.serialize()), 201

# Editar una reserva existente
@api.route("/reservations/<int:id>", methods=["PUT"])
@jwt_required()
def update_reservation(id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user and not user.is_admin:
        return jsonify({"status": "error", "message": "Acceso denegado"}), 403

    reservation = Reservation.query.get(id)
    if not reservation:
        return jsonify({"status": "error", "message": "Reservation not found"}), 404

    data = request.json
    reservation.consultorio = data.get("consultorio", reservation.consultorio)
    reservation.date = data.get("date", reservation.date)
    reservation.time = data.get("time", reservation.time)
    reservation.user = data.get("user", reservation.user)

    db.session.commit()
    return jsonify(reservation.serialize()), 200

# Eliminar una reserva
@api.route("/reservations/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_reservation(id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user and not user.is_admin:
        return jsonify({"status": "error", "message": "Acceso denegado"}), 403

    reservation = Reservation.query.get(id)
    if not reservation:
        return jsonify({"status": "error", "message": "Reservation not found"}), 404

    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"status": "success", "message": "Reservation deleted"}), 200

#Perfil de usuario

@api.route("/userProfile", methods=["GET"])
@jwt_required()
def user_profile():
    user_id = get_jwt_identity()  
    user = get_user_from_db(user_id)  # Función para obtener datos del usuario desde la BD

    if user:
        return jsonify({
            "name": user.name,
            "email": user.email,
            "telefono": user.telefono
        }), 200
    return jsonify({"error": "User not found"}), 404
