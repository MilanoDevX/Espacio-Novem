import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/admin.css";
import Swal from 'sweetalert2';
import { parseISO, isBefore, addHours, isWithinInterval, format } from 'date-fns';

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
        <div className="admin-container">
            <div className="admin-header">
                <h2>
                    Registro de Consultas
                </h2>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th className="auto-width">Reserva</th>
                            <th className="auto-width">Fecha</th>
                            <th className="auto-width">Hora</th>
                            <th className="auto-width">Consultorio</th>
                            <th className="auto-width">Nombre</th>
                            <th className="auto-width">Apellido</th>
                            <th className="auto-width">Email</th>
                            <th className="auto-width">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => {
                                const appointmentDateTime = parseISO(appointment.date + 'T' + appointment.hour + ':00');
                                const now = new Date();
                                const isPast = isBefore(appointmentDateTime, now);
                                const isWithin24Hours = isWithinInterval(appointmentDateTime, { start: now, end: addHours(now, 24) });

                                return (
                                    <tr key={appointment.id} className={isPast ? 'admin-past-date-row' : isWithin24Hours ? 'admin-within-24h-row' : ''}>
                                        <td>{appointment.id}</td>
                                        <td>{format(convertUTCDateToLocalDate(new Date(appointment.date)), 'dd/MM/yyyy')}</td>
                                        <td>{appointment.hour}</td>
                                        <td>{appointment.office}</td>
                                        <td>{appointment.user_name}</td>
                                        <td>{appointment.user_last_name}</td>
                                        <td>{appointment.user_email}</td>
                                        <td>
                                            {!isPast && (
                                                <button className="delete-btn" onClick={() => handleDelete(appointment.id)}>
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
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
    );
};