import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/admin.css";
import Swal from 'sweetalert2';

export const Admin = () => {
    const { actions, store } = useContext(Context);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await actions.getReservationsAdmin();
            console.log(data);

            if (data && data.length > 0) {
                const sortedAppointments = data.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date); // Orden descendente por fecha
                });
                setAppointments(sortedAppointments);
            } else {
                setAppointments(data); 
            }

        };

        fetchAppointments();
    }, []);

    const handleDelete = async (id) => {
        const response = await actions.deleteReservation(id);
        if (response) {
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
            Swal.fire({
                icon: "success",
                title: "Reserva eliminada con éxito",
                text: "",
                timer: 1000,
                showConfirmButton: false,
            });
        } else {
            alert("Hubo un error al eliminar la reserva");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const convertUTCDateToLocalDate = (date) => {
        if (!date) return null;
        const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        return newDate;
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
                                        <td>{formatDate(convertUTCDateToLocalDate(new Date(appointment.date)))}</td>
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