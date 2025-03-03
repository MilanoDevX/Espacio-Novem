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


from flask_cors import CORS

app = Flask(__name__)
CORS(app)


api = Blueprint('api', __name__)


CORS(api)

aleatorio=""
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

def send_signup_email(receivers_email):
   message = MIMEMultipart("alternative")

   message["Subject"] = "Bienvenido a Espacio Novem !"
   message["From"] = os.getenv("SMTP_USERNAME")
   message["To"] = ",".join(receivers_email)
    
   html_content = """
       <html>
           <body>
               <h1>Bienvenido a Espacio Novem !</h1>
               <p>¿Olvidaste la contraseña?</p>
               <p>Por favor, ingresa el correo electrónico que usas en la aplicación para continuar.</p>
           </body>
       </html>
   """
   text = "Correo enviado desde la API Espacio Novem. Saludos👋."

   message.attach(MIMEText(text, "plain"))
   message.attach(MIMEText(html_content, "html"))

   server = smtplib.SMTP(smtp_host, smtp_port)
   server.starttls()
   server.login(sender_email, sender_password)
   server.sendmail(sender_email, receivers_email, message.as_string())
   server.quit()

   
def generate_random_password(length=10):
  
  chars = string.ascii_letters + string.digits + string.punctuation
 
  password = ''.join(random.choice(chars) for _ in range(length))
  return password




@api.route('/send-email', methods=['PUT'])
def send_email():
   data=request.json
   receivers_email=data["email"]
   user_random_password=generate_random_password()
    
   exist_user=User.query.filter_by(email=receivers_email).first()
   
   if receivers_email is None :
       return jsonify({"msg":"Falta ingresar email"}),404
    
   if exist_user is None :
       return jsonify({"msg":"Usuario no registrado"}),404
    
    # if user_random_password==aleatorio:
   exist_user.password=user_random_password
   db.session.commit()
 

   message = MIMEMultipart("alternative")

   message["Subject"] = "Olvido de contraseña - Espacio Novem"
   message["From"] = "andamanagment@gmail.com"
   message["To"] = ",".join(receivers_email)
   

   html_content = f"""
       <html>
           <body>
               <h1>Bienvenido a Espacio Novem !</h1>
               <p>¿Olvidaste la contraseña?</p>
               <p>Tu password aleatorio es : {user_random_password}.</p>
               <p>Recuerda volver a la aplicacion web para continuar el cambio de contraseña</p>
           </body>
       </html>
   """
   text = "Correo enviado desde la API Espacio Novem !. Saludos👋."

   message.attach(MIMEText(text, "plain"))
   message.attach(MIMEText(html_content, "html"))

   server = smtplib.SMTP(smtp_host, smtp_port)
   server.starttls()
   server.login(sender_email, sender_password)
   server.sendmail(sender_email, receivers_email, message.as_string())
   server.quit()

   return jsonify({"msg": "Correo enviado correctamente"}), 200

@api.route('/recuperar-password', methods=['PUT'])
def recuperar_password():
    data=request.json
    email=data.get("email")
    nueva=data.get("nueva")
    aleatoria=data.get("aleatoria")
   
    exist_user=User.query.filter_by(email=email).first()
   
    if email is None :
        return jsonify({"msg":"Falta ingresar email"}),404
    
    if exist_user is None :
       return jsonify({"msg":"Usuario no registrado"}),401
    
    print(exist_user.password,aleatoria)

    if exist_user.password != aleatoria:
        return jsonify({"msg":"El password enviado no coincide"}),403
    
    if user_random_password==aleatorio:
     exist_user.password=nueva
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
