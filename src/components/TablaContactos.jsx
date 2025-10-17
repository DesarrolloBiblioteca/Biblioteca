import React from "react";

const TablaContactos = ({
  contactos,
  dispatch,
  setContactoEditar,
  setFormView,
}) => {
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      const actionDelete = {
        type: "delete",
        payload: id,
      };
      dispatch(actionDelete);
    }
  };

  const handleEdit = (contacto) => {
    setContactoEditar(contacto);
    setFormView(true);
  };

  const calcularEdad = (cumpleanos) => {
    if (!cumpleanos) return "N/A";

    const hoy = new Date();
    const fechaNacimiento = new Date(cumpleanos);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Avatar</th>
            <th>nombre</th>
            <th>numero</th>
            <th>Sexo</th>
            <th>Cumpleaños</th>
            <th>Edad</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto) => (
            <tr key={contacto.id}>
              <th>{contacto.id.split("-")[0]}</th>
              <td>
                <img
                  src={contacto.imagen}
                  alt={contacto.nombre}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/50?text=?";
                  }}
                />
              </td>
              <td>{contacto.nombre}</td>
              <td>{contacto.numero}</td>
              <td>
                <span
                  className={`badge ${
                    contacto.sexo === "Masculino"
                      ? "bg-primary"
                      : contacto.sexo === "Femenino"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {contacto.sexo}
                </span>
              </td>
              <td>
                {contacto.cumpleanos
                  ? new Date(
                      contacto.cumpleanos + "T00:00:00"
                    ).toLocaleDateString("es-MX")
                  : "N/A"}
              </td>
              <td>
                <strong>{calcularEdad(contacto.cumpleanos)} años</strong>
              </td>
              <td>
                <button
                  onClick={() => handleEdit(contacto)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(contacto.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaContactos;
