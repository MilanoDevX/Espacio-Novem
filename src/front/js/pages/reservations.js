import React, { useState } from 'react';
import Calendar from '../component/calendar';
import FormReservations from '../component/formReservations';

export const  Reservations = () => {

    return (
        <div className="d-flex justify-content-center">
            <div className="flex-direction-column">
                <h1 className="my-3 d-flex justify-content-center">CALENDAR</h1>
                <div className="my-3">
                    <Calendar/>
                </div>
                <div>
                    <FormReservations/>
                </div>
            </div>
            






        </div>
    )

}

