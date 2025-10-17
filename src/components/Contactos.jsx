import React, { useEffect, useReducer, useState } from "react";
import { ContactosReducer } from "../reducers/ContactosReducer";
import Formulario from "./Formulario";
import TablaContactos from "./TablaContactos";

const Contactos = () => {
  // const contactosIniciales = [
  //   {
  //     id: "c1",
  //     nombre: "Raul",
  //     numero: "4772454224",
  //   },
  //   {
  //     id: "c2",
  //     nombre: "Juana",
  //     numero: "4772452442",
  //   },
  // ];

  // Funcion inicializar el localstorage
  const init = () => {
    const contactos = localStorage.getItem("contactos");
    return contactos ? JSON.parse(contactos) : [];
  };

  // Se activa el useReducer
  // const [state, dispatch] = useReducer(ContactosReducer, contactosIniciales);
  const [state, dispatch] = useReducer(ContactosReducer, [], init);
  const [formView, setFormView] = useState(false);
  const [contactoEditar, setContactoEditar] = useState(null);

  useEffect(() => {
    //Actualizamos el localstorage
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  console.log(useReducer);

  return (
    <div className="container mt-3">
      {/* <Formulario dispatch={dispatch} /> */}
      <button
        onClick={() => {
          setFormView(!formView);
          if (formView) {
            setContactoEditar(null);
          }
        }}
        className="btn btn-success btn-lg"
      >
        {!formView ? "➕ Agregar Contacto" : "❌ Cerrar Formulario"}
      </button>

      {formView && (
        <Formulario
          dispatch={dispatch}
          contactoEditar={contactoEditar}
          setContactoEditar={setContactoEditar}
        />
      )}

      {formView}

      <TablaContactos
        contactos={state}
        dispatch={dispatch}
        setContactoEditar={setContactoEditar}
        setFormView={setFormView}
      />
    </div>
  );
};

export default Contactos;
