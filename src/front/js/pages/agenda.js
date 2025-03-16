
import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext"
import '../../styles/agenda.css';
import { format, parseISO, isBefore, addHours, isWithinInterval } from 'date-fns';

export const Agenda = () => {

    const { actions, store } = useContext(Context);

    const now = new Date();
    const todayFormatted = format(now, 'yyyy-MM-dd');
    const [selectedDate, setSelectedDate] = useState(todayFormatted);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getReservationsByEmail();
            console.log(data);
            
            // Ordenar las reservas por fecha en orden descendente
            const sortedData = data.sort((a, b) => parseISO(b.date + 'T' + b.hour + ':00') - parseISO(a.date + 'T' + a.hour + ':00'));

            setReservations(sortedData);
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
    };

    return (
        <div className="agenda-container">
            <div className="agenda-header">
                <h2>
                    Registro de reservas
                </h2>
            </div>
            <div className="agenda-table-container">
                <table className="agenda-table">
                    <thead>
                        <tr>
                            <th className="auto-width">Reserva Nº</th>
                            <th className="auto-width">Fecha</th>
                            <th className="auto-width">Hora</th>
                            <th className="auto-width">Consultorio</th>
                            <th className="auto-width">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reservations.filter(r => !isBefore(parseISO(r.date + 'T' + r.hour + ':00'), now) || reservations.filter(res => isBefore(parseISO(res.date + 'T' + res.hour + ':00'), now)).slice(0, 10).includes(r)).map(({ id, date, hour, office }) => {
                            const dateTimeStr = `${date}T${hour}:00`;
                            const dateObj = parseISO(dateTimeStr);
                            const isPastDate = isBefore(dateObj, now);
                            const isWithin24Hours = isWithinInterval(dateObj, { start: now, end: addHours(now, 24) });

                            return (
                                <tr key={id} className={isPastDate ? "past-date-row" : isWithin24Hours ? "within-24h-row" : "same-height-row"}>
                                    <td>{id}</td>
                                    <td>{format(dateObj, 'dd/MM/yyyy')}</td>
                                    <td>{hour}</td>
                                    <td>{office}</td>
                                    <td>
                                        {isPastDate ? (
                                            <i className="italic">Reserva utilizada</i>
                                        ) : isWithin24Hours ? (
                                            <i className="italic">Próxima sesión</i>
                                        ) : (
                                            <button className="delete-btn" onClick={() => handleDelete(id)}>
                                                Eliminar reserva
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
