
import React, { useState } from 'react';
import Calendar from '../component/calendar';
import FormReservations from '../component/formReservations';

export const Reservations = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <div className="pt-3 pb-0 mb-0">
                <h2 className="text-center">Reservas de Consultorios</h2>
                <h3 className="text-center mt-2">Disponibilidad para día 24/01/2025</h3>
            </div>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center mb-3">
                    {/* Contenedor del calendario */}
                    <div className="col-lg-4 col-12 mb-3 mb-lg-0">
                        <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
                    </div>
                    {/* Contenedor del formulario */}
                    <div className="col-lg-6 col-12">
                        <FormReservations selectedDate={selectedDate} />
                    </div>
                </div>
            </div>
        </div>
    );
};
