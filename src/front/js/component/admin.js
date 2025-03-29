import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/admin.css";
import { format } from 'date-fns';

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
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{format(new Date(appointment.date), 'dd/MM/yyyy')}</td>
                                    <td>{appointment.hour}</td>
                                    <td>{appointment.office}</td>
                                    <td>{appointment.user_name}</td>
                                    <td>{appointment.user_last_name}</td>
                                    <td>{appointment.user_email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-danger">No hay consultas registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
