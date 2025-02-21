
import React, { useState, useEffect } from 'react';
import '../../styles/agenda.css';
import { format, parseISO, isBefore, addHours, isWithinInterval } from 'date-fns';

export const Agenda = () => {
    const now = new Date();
    const todayFormatted = format(now, 'yyyy-MM-dd');
    const [selectedDate, setSelectedDate] = useState(todayFormatted);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                { id: 1, user: 'elias', date: '2025-01-01', hour: '10:00', consultories: [1] },
                { id: 2, user: 'elias', date: '2025-01-01', hour: '11:00', consultories: [2] },
                { id: 3, user: 'elias', date: '2025-01-01', hour: '12:00', consultories: [3] },
                { id: 4, user: 'elias', date: '2025-01-01', hour: '13:00', consultories: [4] },
                { id: 5, user: 'elias', date: '2025-01-02', hour: '10:00', consultories: [4] },
                { id: 6, user: 'elias', date: '2025-01-02', hour: '11:00', consultories: [4] },
                { id: 7, user: 'elias', date: '2025-01-02', hour: '12:00', consultories: [4] },
                { id: 8, user: 'elias', date: '2025-02-11', hour: '13:00', consultories: [4] },
                { id: 9, user: 'elias', date: '2025-02-11', hour: '10:00', consultories: [4] },
                { id: 10, user: 'elias', date: '2025-02-21', hour: '11:00', consultories: [4] },
                { id: 11, user: 'elias', date: '2025-02-21', hour: '12:00', consultories: [4] },
                { id: 12, user: 'elias', date: '2025-02-22', hour: '13:00', consultories: [1] },
                { id: 13, user: 'elias', date: '2025-02-22', hour: '16:00', consultories: [3] },
                { id: 14, user: 'elias', date: '2025-02-22', hour: '17:00', consultories: [4] },
                { id: 15, user: 'elias', date: '2025-02-22', hour: '18:00', consultories: [4] }
            ];

            const filteredData = data.filter(entry => entry.user === 'elias');

            // Ordenar las reservas por fecha en orden descendente
            const sortedData = filteredData.sort((a, b) => parseISO(b.date + 'T' + b.hour + ':00') - parseISO(a.date + 'T' + a.hour + ':00'));

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
                    Registro de reservas pendientes
                </h2>
            </div>
            <div className="agenda-table-container">
                <table className="agenda-table">
                    <thead>
                        <tr>
                            <th className="auto-width">Fecha</th>
                            <th className="auto-width">Hora</th>
                            <th className="auto-width">Consultorio</th>
                            <th className="auto-width">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reservations.filter(r => !isBefore(parseISO(r.date + 'T' + r.hour + ':00'), now) || reservations.filter(res => isBefore(parseISO(res.date + 'T' + res.hour + ':00'), now)).slice(0, 10).includes(r)).map(({ id, date, hour, consultories }) => {
                            const dateTimeStr = `${date}T${hour}:00`;
                            const dateObj = parseISO(dateTimeStr);
                            const isPastDate = isBefore(dateObj, now);
                            const isWithin24Hours = isWithinInterval(dateObj, { start: now, end: addHours(now, 24) });

                            return (
                                <tr key={id} className={isPastDate ? "past-date-row" : isWithin24Hours ? "within-24h-row" : "same-height-row"}>
                                    <td>{format(dateObj, 'dd/MM/yyyy')}</td>
                                    <td>{hour}</td>
                                    <td>{consultories.join(', ')}</td>
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
