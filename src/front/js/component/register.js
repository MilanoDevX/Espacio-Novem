import React, { useContext, useState } from "react";
import "/src/front/styles/register.css";


export const Register = () => {
    return (

        <>
            <div className="mx-auto pt-3 register">
                <div className="text-center pt-5">
                    <h1 className="text-center">Registrarse</h1>
                </div>
                <div className="mb-2">
                    <div className="coolinput">
                        <label for="input" className="text">Nombre</label>
                        <input type="text" placeholder="Escribe tu nombre aqui..." name="input" className="input" />
                    </div>
                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label for="input" className="text">Apellido</label>
                        <input type="text" placeholder="Escribe tu apellido aqui..." name="input" className="input" />
                    </div>

                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label for="input" className="text">Teléfono</label>
                        <input type="text" placeholder="Escribe tu teléfono aquí..." name="input" className="input" />
                    </div>
                </div>
                <div className="mb-2">
                    <div className="coolinput">
                        <label for="input" className="text">Corre Electronico</label>
                        <input type="text" placeholder="Escribe tu correo  aqui..." name="input" className="input" />
                    </div>

                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label for="input" className="text">Contraseña</label>
                        <input type="text" placeholder="Escribe tu contraseña aqui..." name="input" className="input" />
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
                        <input type="text" placeholder="Escribe tu contraseña aqui..." name="input" className="input" />
                        <span id="passwordHelpInline" className="form-text">
                            Debe contener de 8 a 20 caracteres. <button className="btn eye ">
                                <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>
                            </button>
                        </span>

                    </div>


                </div>
                <div className="text-center mb-4">
                    <button type="button" className="boton ">Registrarse</button>
                    <button type="button" className="boton ">Volver</button>
                </div>

            </div>
        </>
    )

}