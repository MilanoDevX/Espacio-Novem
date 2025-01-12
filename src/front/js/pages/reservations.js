import React, { useState } from 'react';
import Calendar from '../component/calendar';
import FormReservations from '../component/formReservations';

export const Reservations = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <div className="d-flex my-2 justify-content-center">
                <h1>Gestión de Alquiler de Consultorios</h1>
            </div>
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && (
                <div>
                    <div className="d-flex mt-4 justify-content-center">
                        <h2>Reservas para el {selectedDate}</h2>
                    </div>
                    <div className="col-12 col-md-8 mx-auto mt-3">
                        <FormReservations selectedDate={selectedDate} />
                    </div>
                </div>
            )}
        </div>
    );
}



