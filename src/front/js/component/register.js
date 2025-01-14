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
                    <div class="coolinput">
                        <label for="input" class="text">Nombre</label>
                        <input type="text" placeholder="Escribe tu nombre aqui..." name="input" class="input" />
                    </div>
                </div>

                <div className="mb-2">
                    <div class="coolinput">
                        <label for="input" class="text">Apellido</label>
                        <input type="text" placeholder="Escribe tu apellido aqui..." name="input" class="input" />
                    </div>

                </div>

                <div className="mb-2">
                    <div class="coolinput">
                        <label for="input" class="text">Teléfono</label>
                        <input type="text" placeholder="Escribe tu teléfono aquí..." name="input" class="input" />
                    </div>
                </div>
                <div className="mb-2">
                    <div class="coolinput">
                        <label for="input" class="text">Corre Electronico</label>
                        <input type="text" placeholder="Escribe tu correo  aqui..." name="input" class="input" />
                    </div>

                </div>

                <div className="mb-2">
                    <div class="coolinput">
                        <label for="input" class="text">Contraseña</label>
                        <input type="text" placeholder="Escribe tu contraseña aqui..." name="input" class="input" />
                        <span id="passwordHelpInline" className="form-text">
                            Debe contener de 8 a 20 caracteres.
                        </span>
                        <button className="btn eye btn-outline">
                            <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>
                        </button>
                    </div>

                </div>
                <div className="mb-3">
                    <div class="coolinput">
                        <label for="input" class="text">Confirmar Contraseña</label>
                        <input type="text" placeholder="Escribe tu contraseña aqui..." name="input" class="input" />

                        <button className="btn eye btn-outline">
                            <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>
                        </button>
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