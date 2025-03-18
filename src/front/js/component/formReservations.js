
import React, { useState, useEffect, useContext } from 'react';
import '../../styles/formReservations.css';
import { Context } from "../store/appContext"


const FormReservations = ({ selectedDate }) => {
  const [schedule, setSchedule] = useState([]);
  const { actions, store } = useContext(Context);


  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      const data = await actions.getReservations();

      if (data) {
        const filteredData = data.filter((entry) => entry.date === selectedDate);
        setSchedule(filteredData);
      }

    };

    fetchData();
  }, [selectedDate]);

  const allHours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00',
  ];


  const handleRadioChange = (hour, office) => {
    console.log(`Hora: ${hour}, Consultorio seleccionado: ${office}`);
  };


  const handleScheduleSubmit = async () => {
    console.log("Datos enviados al backend");

    // 1. Recopilar las reservas seleccionadas
    const selectedReservations = [];
    allHours.forEach((hour) => {
      const selectedOffice = document.querySelector(
        `input[name="office-${hour}"]:checked`
      )?.value;

      if (selectedOffice && selectedOffice !== "Ninguno") {
        selectedReservations.push({
          date: selectedDate,
          hour: hour,
          office: parseInt(selectedOffice), // Asegúrate de que office sea un número
        });
      }
    });

    // 2. Enviar las reservas al backend
    try {
      if (selectedReservations.length > 0) {
        const response = await fetch("http://localhost:3001/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Incluye los headers de autorización si los necesitas
            // "Authorization": `Bearer ${store.token}`
          },
          body: JSON.stringify(selectedReservations), // Envía un array de reservas
        });

        if (!response.ok) {
          throw new Error(
            `Error al guardar las reservas: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Respuesta del backend:", data);

        // 3. Actualizar la interfaz de usuario (opcional)
        alert("Reservas guardadas con éxito");
        actions.getReservations(); // Recargar las reservas desde la API

        // setSchedule([]); // Borra las reservas actuales
        // actions.getReservations(); // Recargar las reservas desde la API

        // // 🔹 Restablecer la selección de los radio buttons
        // document.querySelectorAll('input[type="radio"]').forEach(input => {
        //   if (input.value === "Ninguno") {
        //     input.checked = true;
        //   } else {
        //     input.checked = false;
        //   }
        // });

      } else {
        alert("No se seleccionaron reservas.");
      }
    } catch (error) {
      console.error("Error al enviar las reservas:", error);
      alert("Error al guardar las reservas");
    }
  };


  const getRowData = (hour) => {
    const filteredEntries = schedule.filter((entry) => entry.hour === hour);
    const reservedoffices = filteredEntries.flatMap(entry => entry.office);

    return {
      hour,
      offices: reservedoffices,
      default: 'Ninguno',
    };
  };

  const isAvailable = (offices) => offices.length < 4;

  return (
    <div className="form-reservations-container container">
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th rowSpan="2" className="align-middle">Horario</th>
            <th rowSpan="2" className="align-middle">Estado</th>
            <th colSpan="4">Consultorios</th>
            <th rowSpan="2" className="align-middle">NA</th>
          </tr>
          <tr>
            {[1, 2, 3, 4].map((office) => (
              <th key={office}>{office}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allHours.map((hour) => {
            const row = getRowData(hour);
            const status = isAvailable(row.offices) ? 'Disponible' : 'No disponible';

            return (
              <tr key={hour} className={status === 'No disponible' ? 'no-available' : ''}>
                <td>{row.hour}</td>
                <td>{status}</td>
                {[1, 2, 3, 4].map((office) => (
                  <td key={office}>
                    <input
                      className="input-color"
                      type="radio"
                      name={`office-${row.hour}`}
                      value={office}
                      defaultChecked={row.default === office}
                      onChange={() => handleRadioChange(row.hour, office)}
                      disabled={row.offices.includes(office)}
                    />
                  </td>
                ))}
                <td>
                  <input className="input-color"
                    type="radio"
                    name={`office-${row.hour}`}
                    value="Ninguno"
                    defaultChecked={true}
                    onChange={() => handleRadioChange(row.hour, 'Ninguno')}
                    disabled={!isAvailable(row.offices)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center my-0">
        <button className="btn reservation-button" onClick={handleScheduleSubmit}>Agendar</button>
      </div>
    </div>
  );
};

export default FormReservations;
