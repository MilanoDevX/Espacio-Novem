import React, { useState, useEffect } from 'react';
import '../../styles/formReservations.css';

const FormReservations = () => {
    const [schedule, setSchedule] = useState([]);
  
    // Simulación de datos desde el backend
    useEffect(() => {
      const fetchData = async () => {
        // Aquí se haría una llamada real al backend
        const data = [
          { hour: '11:00', status: 'No disponible', consultories: [2], default: 'Ninguno' },
          { hour: '15:00', status: 'Disponible', consultories: [2], default: 'Ninguno' },
          { hour: '16:00', status: 'Disponible', consultories: [1, 3], default: 'Ninguno' },
          { hour: '17:00', status: 'Disponible', consultories: [1, 4], default: 'Ninguno' },
          { hour: '18:00', status: 'Disponible', consultories: [2, 3, 4], default: 'Ninguno' },
          { hour: '19:00', status: 'No disponible', consultories: [1, 2, 4], default: 'Ninguno' },
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
  
    const getRowData = (hour) => {
      const row = schedule.find((entry) => entry.hour === hour);
      if (row) {
        return row;
      }
      return {
        hour,
        status: 'Disponible',
        consultories: [1, 2, 3, 4],
        default: 'Ninguno',
      };
    };
  
    return (
      <div className="form-reservations-container">
        <table className="reservations-table">
          <thead>
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
              return (
                <tr key={hour}>
                  <td>{row.hour}</td>
                  <td>{row.status}</td>
                  <td></td>
                  {[1, 2, 3, 4].map((consultory) => (
                    <td key={consultory}>
                      <input
                        type="radio"
                        name={`consultory-${row.hour}`}
                        value={consultory}
                        defaultChecked={row.default === consultory}
                        onChange={() => handleRadioChange(row.hour, consultory)}
                        disabled={row.status === 'No disponible' || !row.consultories.includes(consultory)}
                      />
                    </td>
                  ))}
                  <td>
                    <input
                      type="radio"
                      name={`consultory-${row.hour}`}
                      value="Ninguno"
                      defaultChecked={row.default === 'Ninguno'}
                      onChange={() => handleRadioChange(row.hour, 'Ninguno')}
                      disabled={row.status === 'No disponible'}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default FormReservations;
  