
import React, { useState, useEffect } from 'react';
import '../../styles/agenda.css';
import { format, startOfToday, parseISO, isBefore } from 'date-fns';

export const Agenda = () => {
    const today = startOfToday();
    const todayFormatted = format(today, 'yyyy-MM-dd');
    const [selectedDate, setSelectedDate] = useState(todayFormatted);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                { id:1, user: 'natali', date: '2025-01-31', hour: '11:00', consultories: [1] },
                { id:2, user: 'kate', date: '2025-01-31', hour: '11:00', consultories: [2] },
                { id:3, user: 'fio', date: '2025-01-31', hour: '11:00', consultories: [3] },
                { id:4, user: 'elias', date: '2025-01-31', hour: '11:00', consultories: [4] },
                { id:5, user: 'natali', date: '2025-01-30', hour: '15:00', consultories: [1] },
                { id:6, user: 'kate', date: '2025-01-30', hour: '16:00', consultories: [3] },
                { id:7, user: 'elias', date: '2025-02-05', hour: '17:00', consultories: [4] },
                { id:8, user: 'elias', date: '2025-02-05', hour: '18:00', consultories: [4] }
            ];

            const filteredData = data.filter(entry => entry.user === 'elias');
            setReservations(filteredData);
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
                    Agenda para el día {format(parseISO(selectedDate), 'dd/MM/yyyy')}
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
                        {reservations.map(({ id, date, hour, consultories }) => {
                            const dateObj = parseISO(date);
                            const isPastDate = isBefore(dateObj, today);
                            return (
                                <tr key={id} className={isPastDate ? "past-date-row" : "same-height-row"}>
                                    <td>{format(dateObj, 'dd/MM/yyyy')}</td>
                                    <td>{hour}</td>
                                    <td>{consultories.join(', ')}</td>
                                    <td>
                                        {!isPastDate && (
                                            <button className="delete-btn" onClick={() => handleDelete(id)}>
                                                Eliminar
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
