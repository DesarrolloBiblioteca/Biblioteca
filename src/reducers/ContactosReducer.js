// Definimos el Reducer de contactos como una arrow funcion que recibe
// solo dos parametros que son: state y un action
export const ContactosReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((contacto) => contacto.id !== action.payload);
    case "update":
      return state.map((contacto) =>
        contacto.id === action.payload.id ? action.payload : contacto
      );
    default:
      return state;
  }
};
