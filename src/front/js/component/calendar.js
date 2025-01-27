
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay } from 'date-fns';
import '../../styles/calendar.css';

const Calendar = ({ onDateSelect }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(today); // Estado para el día seleccionado, inicializado con la fecha actual

  useEffect(() => {
    onDateSelect(format(today, 'yyyy-MM-dd')); // Selecciona la fecha actual al renderizar la página
  }, [onDateSelect, today]);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDate(null); // Reinicia selección si se cambia de mes
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDate(null); // Reinicia selección si se cambia de mes
  };

  const handleDayClick = (date) => {
    setSelectedDate(date); // Actualiza el estado del día seleccionado
    onDateSelect(format(date, 'yyyy-MM-dd')); // Devuelve la fecha seleccionada en formato YYYY-MM-DD
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return daysOfWeek.map((day, index) => (
      <div key={`dayOfWeek-${index}`} className="calendar-day-of-week">
        {day}
      </div>
    ));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getDay(startOfMonth(currentDate));
    const days = [];

    // Fill in blank spaces for the first week
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`blank-${i}`} className="calendar-day blank"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${selectedDate?.getTime() === date.getTime() ? 'selected' : ''}`}
          onClick={() => handleDayClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} className="calendar-nav">&#8592;</button>
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="calendar-nav">&#8594;</button>
      </div>
      <div className="calendar-days-of-week">
        {renderDaysOfWeek()}
      </div>
      <div className="calendar-grid">
        
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;