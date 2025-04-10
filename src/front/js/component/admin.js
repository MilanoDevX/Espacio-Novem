import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/admin.css";
import { format, isPast, isWithinInterval, addHours } from "date-fns";
import Swal from "sweetalert2";

export const Admin = () => {
    const { actions, store } = useContext(Context);
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await actions.getReservationsAdmin();
            if (data) {
                const sortedAppointments = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAppointments(sortedAppointments);
                setFilteredAppointments(sortedAppointments);
            }
        };
        fetchAppointments();
    }, []);
    useEffect(() => {
        setFilteredAppointments(
            appointments.filter(appointment =>
                appointment.user_name.toLowerCase().includes(search.toLowerCase()) ||
                appointment.user_last_name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, appointments]);
    // Función para convertir UTC a hora local
    const convertUTCDateToLocalDate = (date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    };
    // Manejar eliminación de reserva con SweetAlert2
    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await actions.deleteReservation(id);
                if (response) {
                    setAppointments(appointments.filter(appointment => appointment.id !== id));
                    setFilteredAppointments(filteredAppointments.filter(appointment => appointment.id !== id));
                    Swal.fire({
                        title: "Eliminado",
                        text: "La reserva ha sido eliminada con éxito.",
                        icon: "success"
                    });
                }
            }
        });
    };
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Registro de Consultas</h2>
                <input
                    type="text"
                    placeholder=" Filtrar por nombre o apellido"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Reserva</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Consultorio</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => {
                                const localDate = convertUTCDateToLocalDate(new Date(appointment.date));
                                const isPastAppointment = isPast(localDate);
                                const isWithin24Hours = isWithinInterval(localDate, {
                                    start: new Date(),
                                    end: addHours(new Date(), 24)
                                });
                                return (
                                    <tr key={appointment.id} className={isPastAppointment ? 'admin-past-date-row' : isWithin24Hours ? 'admin-within-24h-row' : ''}>
                                        <td>{appointment.id}</td>
                                        <td>{format(localDate, 'dd/MM/yyyy')}</td>
                                        <td>{appointment.hour}</td>
                                        <td>{appointment.office}</td>
                                        <td>{appointment.user_name}</td>
                                        <td>{appointment.user_last_name}</td>
                                        <td>{appointment.user_email}</td>
                                        <td>
                                            {!isPastAppointment && (
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