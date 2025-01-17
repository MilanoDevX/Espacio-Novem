
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
            <div className="pt-4 pb-0 mb-0">
                <h2 className="text-center">Gestión de Alquiler de Consultorios</h2>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-1 col-8">
                    {/* Contenedor del calendario */}
                    <div className="p-2 w-50 w-md-50 ">
                        <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
                    </div>
                    {/* Contenedor del formulario */}
                    <div className="p-0 w-75 w-md-50">
                        <FormReservations selectedDate={selectedDate} />
                    </div>
                </div>
            </div>
        </div>
    );
};
