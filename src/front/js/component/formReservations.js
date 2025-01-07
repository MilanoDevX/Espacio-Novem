import React, { useState, useEffect } from 'react';
import '../../styles/formReservations.css';

const FormReservations = () => {
  const [schedule, setSchedule] = useState([]);

  // Simulación de datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      // Aquí se haría una llamada real al backend
      const data = [
        { user: 'natali', hour: '11:00', consultories: [1] },
        { user: 'kate', hour: '11:00', consultories: [2] },
        { user: 'fio', hour: '11:00', consultories: [3] },
        { user: 'elias', hour: '11:00', consultories: [4] },
        { user: 'natali', hour: '15:00', consultories: [1] },
        { user: 'kate', hour: '16:00', consultories: [1, 2, 3, 4] },
        { user: 'fio', hour: '17:00', consultories: [1, 4] },
        { user: 'elias', hour: '18:00', consultories: [2, 3, 4] },
        { user: 'natali', hour: '19:00', consultories: [] }
      ];
      setSchedule(data);
    };
    fetchData();
  }, []);

  const allHours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00',
  ];

  const handleRadioChange = (hour, consultory) => {
    console.log(`Hora: ${hour}, Consultorio seleccionado: ${consultory}`);
  };

  const handleScheduleSubmit = () => {
    // Lógica para enviar datos seleccionados al backend
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

  const isAvailable = (consultories) => consultories.length < 4; // Disponible si no todos los consultorios están reservados

  return (
    <div className="form-reservations-container container mt-5">
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Horario</th>
            <th>Estado</th>
            <th>Consultorios:</th>
            {[1, 2, 3, 4].map((consultory) => (
              <th key={consultory}>{consultory}</th>
            ))}
            <th>Ninguno</th>
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
                <td></td>
                {[1, 2, 3, 4].map((consultory) => (
                  <td key={consultory}>
                    <input
                      type="radio"
                      name={`consultory-${row.hour}`}
                      value={consultory}
                      defaultChecked={row.default === consultory}
                      onChange={() => handleRadioChange(row.hour, consultory)}
                      disabled={row.consultories.includes(consultory)} // Deshabilitado si el consultorio está reservado
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="radio"
                    name={`consultory-${row.hour}`}
                    value="Ninguno"
                    defaultChecked={true} // Marcado por defecto
                    onChange={() => handleRadioChange(row.hour, 'Ninguno')}
                    disabled={!isAvailable(row.consultories)} // Deshabilitado si no hay consultorios disponibles
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
