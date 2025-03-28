import React, { useContext, useEffect, useState } from "react";
import "../../styles/userProfile.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import logo from "../../img/image.png";


export const UserProfile = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    telefono: "",
  });
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    if (!store.user) {
      actions.getProfile();
    } else {
      setUserData({
        name: store.user.name || "",
        last_name: store.user.last_name || "",
        telefono: store.user.telefono || "",
      });
    }
  }, [store.user]);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [editingField]: e.target.value });
  };

  const handleSave = async () => {
    if (!editingField) return;
    try {
      const response = await fetch(process.env.BACKEND_URL + "/userProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        actions.getProfile();
      } else {
        console.error("Error al actualizar el perfil:", data.msg);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    setEditingField(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleLogout = () => {
    actions.logout();
    const offcanvasElement = document.getElementById("offcanvasExample");
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) {
        offcanvas.hide();
      }
    }
    document.activeElement?.blur();
    document.body.focus();
    navigate("/");
  };

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Perfil del Usuario 🟢
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        <div className="d-flex flex-column align-items-center">
          <div className="card p-3">
          <img src={logo} className="card-img-top" alt="avatar" />
            <div className="card-body">
              {["name", "last_name", "telefono"].map((field) => (
                <div className="d-flex justify-content-between align-items-center mb-2" key={field}>
                  {editingField === field ? (
                    <input
                      type="text"
                      value={userData[field]}
                      onChange={handleChange}
                      onBlur={handleSave}
                      onKeyDown={handleKeyPress}
                      autoFocus
                    />
                  ) : (
                    <span>{field === "name" ? "Nombre" : field === "last_name" ? "Apellido" : "Teléfono"}: {userData[field]}</span>
                  )}
                  <i
                    className="fa-solid fa-pencil text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(field)}
                  ></i>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Correo: {store.user?.email}</span>
              </div>
              <button className="btn2 btn-danger mt-3" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
