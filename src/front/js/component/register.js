import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import "/src/front/styles/register.css";



export const Register = () => {


    const navigate = useNavigate();
    const volver = () => {
        navigate(-1);
    };


    const { store, actions } = useContext(Context);
    const [name, setName] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmar, setConfirmar] = useState("")
    const [shown, setShown] = useState(false);
    const switchShown = () => setShown(!shown);
    const mensaje = (titulo) => {
        Swal.fire({
            icon: "Error",
            title: "Error de ingreso",
            text: titulo,

        });
    }



    const signup = async (e) => {
        e.preventDefault()

        if (name == "") {
            mensaje("Falta ingresar el nombre")
            return
        }
        if (last_name == "") {
            mensaje("Falta ingresar el apellido")
            return
        }

        if (email == "") {
            mensaje("Falta ingresar el email")
            return
        }
        if (password == "") {
            mensaje("Falta ingresar el contraseña")
            return
        }
        if (phone == "") {
            mensaje("Falta ingresar el telefono")
            return
        }
        if (password.length > 20 || password.length < 8) {
            mensaje("El password debe contenter de 8 a 20 caracteres")
            return

        }
        if (confirmar == "") {
            mensaje("Falta ingresar la confirmacion de contraseña")
            return
        }
        if (confirmar != password) {
            mensaje(" La contraseña no coincide con la confirmacion")
            return
        }
        let newUser = {
            name: name,
            last_name: last_name,
            email: email,
            password: password,
            phone: phone


        }
        let resp = await actions.signup(newUser)

        if (resp) {
            let userLogin = {
                email: email,
                password: password

            }

            let respLogin = await actions.login(userLogin);

            if (respLogin) {

                Swal.fire({
                    icon: "success",
                    title: "Usuario registrado con éxito",
                    text: "Bienvenido",
                });
                navigate("/")
            } else {
                errorMessage("Error al iniciar sesión después del registro");
            }
        } else {
            errorMessage("Error al registrar el usuario");
        }

    }





return (

    <>
        <div className="mx-auto pt-3 register">
            <div className="text-center pt-5">
                <h1 className="text-center">Registrarse</h1>
            </div>
            <div className="mb-2">
                <div className="coolinput">
                    <label for="input" className="text">Nombre</label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} id="exampleFormControlInput1" placeholder="Escribe tu nombre aqui..." name="input" className="input" />
                </div>
            </div>

            <div className="mb-2">
                <div className="coolinput">
                    <label for="input" className="text">Apellido</label>
                    <input type="text" value={last_name} onChange={(event) => setLast_name(event.target.value)} id="exampleFormControlInput2" placeholder="Escribe tu apellido aqui..." name="input" className="input" />
                </div>

            </div>

            <div className="mb-2">
                <div className="coolinput">
                    <label for="input" className="text">Teléfono</label>
                    <input type="text" value={telefono} onChange={(event) => setTelefono(event.target.value)} id="exampleFormControlInput3" placeholder="Escribe tu teléfono aquí..." name="input" className="input" />
                </div>
            </div>
            <div className="mb-2">
                <div className="coolinput">
                    <label for="input" className="text">Corre Electronico</label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} id="exampleFormControlInput4" placeholder="Escribe tu correo  aqui..." name="input" className="input" />
                </div>

            </div>

            <div className="mb-2">
                <div className="coolinput">
                    <label for="input" className="text">Contraseña</label>
                    <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} id="inputPassword5" placeholder="Escribe tu contraseña aqui..." name="input" className="input" />
                    <span id="passwordHelpInline" className="form-text">
                        Debe contener de 8 a 20 caracteres. <button className="btn eye ">
                            <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>
                        </button>
                    </span>

                </div>

            </div>
            <div className="mb-3">
                <div className="coolinput">
                    <label for="input" className="text">Confirmar Contraseña</label>
                    <input type="text" value={confirmar} onChange={(event) => setConfirmar(event.target.value)} id="inputPassword6" placeholder="Escribe tu contraseña aqui..." name="input" className="input" />
                    <span id="passwordHelpInline" className="form-text">
                        Debe contener de 8 a 20 caracteres. <button className="btn eye ">
                            <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>
                        </button>
                    </span>

                </div>


            </div>
            <div className="text-center mb-4">
                <button type="button" className="boton " onClick={(event) => signup(event)}>Registrarse</button>
                <button type="button" className="boton " onClick={volver}>Volver</button>
            </div>

        </div>
    </>
);
};