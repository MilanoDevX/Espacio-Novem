import React, { useState, useCallback } from 'react';
import Calendar from '../component/calendar';
import FormReservations from '../component/formReservations';
import "../../styles/reservations.css";
import { format, startOfToday, parseISO } from 'date-fns';
import { Context } from "../store/appContext"
import { useContext } from "react";


export const Reservations = () => {
   
    const today = format(startOfToday(), 'yyyy-MM-dd'); // Aplicando formato
    const [selectedDate, setSelectedDate] = useState(today);
    const { actions } = useContext(Context);
  
    const handleDateSelect = (date) => {
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        const formattedDate = format(parsedDate, 'yyyy-MM-dd'); // Formato estándar para la comparación
        setSelectedDate(formattedDate);
    };
   
    const handleReservationsUpdated = useCallback(async () => {
        // Recarga las reservas cuando FormReservations le indica que se han actualizado.
        await actions.getReservations();
    }, [actions]);
    
    return (
        <div>
            <div className="pt-3 pb-0 mb-0">
                <h2 className="reservations-title text-center">Reserva de Consultorios</h2>
                <h3 className="text-center mt-2">
                    Disponibilidad para día {format(parseISO(selectedDate), 'dd/MM/yyyy')}
                </h3>
            </div>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center mb-3">
                    {/* Contenedor del calendario */}
                    <div className="col-lg-4 col-12 mb-3 mb-lg-0">
                        <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
                    </div>
                    {/* Contenedor del formulario */}
                    <div className="col-lg-6 col-12">
                        <FormReservations selectedDate={selectedDate} onReservationsUpdated={handleReservationsUpdated} />
                    </div>
                </div>
            </div>
        </div>
    );
};









