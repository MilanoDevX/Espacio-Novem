import React, { useState, useEffect } from "react";
import "../../styles/admin.css"; // Importa el CSS

export const Admin = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, consultorio: "3", date: "5/2/2025", time: "15 horas", user: "Fiorellita" },
      { id: 2, consultorio: "4", date: "5/2/2025", time: "15 horas", user: "Natalita" },
      { id: 3, consultorio: "2", date: "5/2/2025", time: "15 horas", user: "Eliasito" },
    ];
    setAppointments(data);
  }, []);

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <>
      <div className="contact-container">
        <h1 className="title-consultas m-2">Registro de Consultas</h1>
        <div className="table">
          <table className="table-consultas">
            <thead>
              <tr>
                <th>Consultorio</th>
                <th>Fecha de Alquiler</th>
                <th>Hora de Alquiler</th>
                <th>Nombre del Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.consultorio}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.user}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger">
                    No hay consultas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
