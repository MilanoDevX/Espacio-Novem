import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/admin.css";
import { format, addHours } from "date-fns";
import Swal from "sweetalert2";
import Spinner from "./spinner.js";

export const Admin = () => {
  const { actions, store } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función para convertir UTC a hora local (suma el offset)
  const convertUTCDateToLocalDate = (date) => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  // Función para combinar la fecha y la hora de la reserva en un solo objeto Date
  const getAppointmentDateTime = (appointment) => {
    // Convertimos la fecha del backend a local
    const baseDate = convertUTCDateToLocalDate(new Date(appointment.date));
    // Suponiendo que appointment.hour tiene el formato "HH:mm"
    const [hour, minute] = appointment.hour.split(":").map(Number);
    baseDate.setHours(hour, minute, 0, 0);
    return baseDate;
  };

  const { getReservationsAdmin, deleteReservation } = actions;

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      const data = await getReservationsAdmin();
      if (data && isMounted) {
        // Ordenamos las reservas de forma descendente considerando fecha y hora
        const sortedAppointments = data.sort((a, b) => {
          const dateA = getAppointmentDateTime(a);
          const dateB = getAppointmentDateTime(b);
          return dateB - dateA;
        });
        setAppointments(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, [getReservationsAdmin]);


  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(appointment =>
        appointment.user_name.toLowerCase().includes(search.toLowerCase()) ||
        appointment.user_last_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, appointments]);

  // Manejar eliminación de reserva con SweetAlert2
  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true); // Mostrar spinner
        const response = await actions.deleteReservation(id);
        setIsLoading(false); // Ocultar spinner

        if (response) {
          setAppointments(appointments.filter(appointment => appointment.id !== id));
          setFilteredAppointments(filteredAppointments.filter(appointment => appointment.id !== id));
          Swal.fire({
            title: "Eliminado",
            text: "La reserva ha sido eliminada con éxito.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la reserva.",
            icon: "error",
          });
        }
      }
    });
  };

  // Para asignar estilos según el datetime de la reserva
  const now = new Date();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Registro de Consultas</h2>
        <input
          type="text"
          placeholder=" Filtrar por nombre o apellido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          disabled={isLoading}
        />
      </div>
      {isLoading && (
        <div className="spinner-overlay">
          <Spinner /> {/* Mostrar el Spinner */}
        </div>
      )}
      <div className="admin-table-container" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reserva</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Consultorio</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const appointmentDateTime = getAppointmentDateTime(appointment);
                // Asignar estilos:
                // Si la reserva es igual o menor a la hora actual -> admin-past-date-row
                // Si es mayor a ahora y menor o igual a (now + 24 horas) -> admin-within-24h-row
                const rowClass =
                  appointmentDateTime <= now
                    ? "admin-past-date-row"
                    : appointmentDateTime > now && appointmentDateTime <= addHours(now, 24)
                      ? "admin-within-24h-row"
                      : "";

                return (
                  <tr key={appointment.id} className={rowClass}>
                    <td>{appointment.id}</td>
                    <td>{format(appointmentDateTime, "dd/MM/yyyy")}</td>
                    <td>{appointment.hour}</td>
                    <td>{appointment.office}</td>
                    <td>{appointment.user_name}</td>
                    <td>{appointment.user_last_name}</td>
                    <td>{appointment.user_email}</td>
                    <td>
                      {appointmentDateTime > now ? (
                        <button className="delete-btn" onClick={() => handleDelete(appointment.id)}>
                          Eliminar
                        </button>
                      ) : (
                        <span className="italic">Utilizada</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-danger">
                  No hay consultas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
