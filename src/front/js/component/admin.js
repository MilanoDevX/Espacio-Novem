import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/admin.css";

export const Admin = () => {
    const { actions, store } = useContext(Context);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
                const data = await actions.getReservationsAdmin();
                console.log(data);
                setAppointments(data);
        };

        fetchAppointments();
    }, [actions]); 

    const handleDelete = async (id) => {
        const response = await actions.deleteReservation(id);
        if (response === true) {
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        }
    };

    return (
        <>
            <div className="contact-container2">
                <h1 className="title-consultas m-2">Registro de Consultas</h1>
                <div className="table">
                    <table className="table-consultas">
                        <thead>
                            <tr>
                                <th>Reserva</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Consultorio</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.id}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.hour}</td>
                                        <td>{appointment.office}</td>
                                        <td>{appointment.user_name}</td>
                                        <td>{appointment.user_last_name}</td>
                                        <td>{appointment.user_email}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete(appointment.id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-danger">
                                        No hay consultas registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};