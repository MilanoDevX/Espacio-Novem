
import React, { useState, useEffect } from 'react';
import '../../styles/formReservations.css';

const FormReservations = ({ selectedDate }) => {
  const [schedule, setSchedule] = useState([]);

  // Simulación de datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { user: 'natali', date: '2025-01-15', hour: '11:00', consultories: [1] },
        { user: 'kate', date: '2025-01-15', hour: '11:00', consultories: [2] },
        { user: 'fio', date: '2025-01-15', hour: '11:00', consultories: [3] },
        { user: 'elias', date: '2025-01-15', hour: '11:00', consultories: [4] },
        { user: 'natali', date: '2025-01-17', hour: '15:00', consultories: [1] },
        { user: 'kate', date: '2025-01-17', hour: '16:00', consultories: [3] },
        { user: 'fio', date: '2025-01-19', hour: '17:00', consultories: [4] },
        { user: 'elias', date: '2025-01-19', hour: '18:00', consultories: [4] }
      ];
      setSchedule(data.filter((entry) => entry.date === selectedDate));
    };
    fetchData();
  }, [selectedDate]);

  const allHours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00',
  ];

  const handleRadioChange = (hour, consultory) => {
    console.log(`Hora: ${hour}, Consultorio seleccionado: ${consultory}`);
  };

  const handleScheduleSubmit = () => {
    console.log("Datos enviados al backend");
  };

  const getRowData = (hour) => {
    const filteredEntries = schedule.filter((entry) => entry.hour === hour);
    const reservedConsultories = filteredEntries.reduce((acc, entry) => {
      return acc.concat(entry.consultories);
    }, []);

    return {
      hour,
      consultories: reservedConsultories,
      default: 'Ninguno',
    };
  };

  const isAvailable = (consultories) => consultories.length < 4;

  return (
    <div className="form-reservations-container container mt-2">
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th rowSpan="2" className="align-middle">Horario</th>
            <th rowSpan="2" className="align-middle">Estado</th>
            <th colSpan="4">Consultorios</th>
            <th rowSpan="2" className="align-middle">Ninguno</th>
          </tr>
          <tr>
            {[1, 2, 3, 4].map((consultory) => (
              <th key={consultory}>{consultory}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allHours.map((hour) => {
            const row = getRowData(hour);
            const status = isAvailable(row.consultories) ? 'Disponible' : 'No disponible';

            return (
              <tr key={hour} className={status === 'No disponible' ? 'table-danger' : ''}>
                <td>{row.hour}</td>
                <td>{status}</td>
                {[1, 2, 3, 4].map((consultory) => (
                  <td key={consultory}>
                    <input
                      type="radio"
                      name={`consultory-${row.hour}`}
                      value={consultory}
                      defaultChecked={row.default === consultory}
                      onChange={() => handleRadioChange(row.hour, consultory)}
                      disabled={row.consultories.includes(consultory)}
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="radio"
                    name={`consultory-${row.hour}`}
                    value="Ninguno"
                    defaultChecked={true}
                    onChange={() => handleRadioChange(row.hour, 'Ninguno')}
                    disabled={!isAvailable(row.consultories)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleScheduleSubmit}>Agendar</button>
      </div>
    </div>
  );
};

export default FormReservations;
