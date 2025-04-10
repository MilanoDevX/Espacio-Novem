import React, { useState, useEffect, useContext } from 'react';
import '../../styles/formReservations.css';
import { Context } from "../store/appContext"
import Swal from 'sweetalert2'
const FormReservations = ({ selectedDate, onReservationsUpdated }) => {
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
    const selectedReservations = [];
    allHours.forEach((hour) => {
      const selectedOffice = document.querySelector(
        `input[name="office-${hour}"]:checked`
      )?.value;
      if (selectedOffice && selectedOffice !== "Ninguno") {
        selectedReservations.push({
          date: selectedDate,
          hour: hour,
          office: parseInt(selectedOffice),
        });
      }
    });
    if (selectedReservations.length > 0) {
      const resp = await actions.submitReservations(selectedReservations);
      if (resp) {
        Swal.fire({
          icon: "success",
          title: "Reservas guardadas con éxito",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        alert("Hubo un error al guardar las reservas");
      }
      if (onReservationsUpdated) {
        await onReservationsUpdated();
      }
      const updatedData = await actions.getReservations();
      if (updatedData) {
        const filteredData = updatedData.filter((entry) => entry.date === selectedDate);
        setSchedule(filteredData);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Seleccione reservas a guardar",
        text: "",
        timer: 2000,
        showConfirmButton: false,
      });
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
  const isPastHour = (hour) => {
    if (!selectedDate) return false;
    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${hour}:00`);
    if (selectedDateTime.toDateString() === currentDateTime.toDateString()) {
      const currentHour = currentDateTime.getHours();
      const selectedHour = parseInt(hour.split(":")[0]);
      return selectedHour < currentHour;
    }
    return selectedDateTime < currentDateTime;
  };
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
            const pastHour = isPastHour(hour);
            return (
              <tr key={hour} className={status === 'No disponible' || pastHour ? 'no-available' : ''}>
                <td>{row.hour}</td>
                <td>{pastHour ? 'No disponible' : status}</td>
                {[1, 2, 3, 4].map((office) => (
                  <td key={office}>
                    {pastHour ? null : row.offices.includes(office) ? (
                      <i className="fa-solid fa-x"></i>
                    ) : (
                      <input
                        className="input-color"
                        type="radio"
                        name={`office-${row.hour}`}
                        value={office}
                        defaultChecked={row.default === office}
                        onChange={() => handleRadioChange(row.hour, office)}
                        disabled={row.offices.includes(office)}
                      />
                    )}
                  </td>
                ))}
                <td>
                  {pastHour ? null : (
                    <input
                      className="input-color"
                      type="radio"
                      name={`office-${row.hour}`}
                      value="Ninguno"
                      defaultChecked={true}
                      onChange={() => handleRadioChange(row.hour, 'Ninguno')}
                      disabled={!isAvailable(row.offices)}
                    />
                  )}
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
export default FormReservations