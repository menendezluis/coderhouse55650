import EErrors from "./enum.js";

// Función para generar el mensaje de error
const generateProductErrorInfo = (data, errorType) => {
  let errorMessage = "";
  switch (errorType) {
    case EErrors.INVALID_TYPES_ERROR:
      errorMessage = `One or more products have invalid types:
        List of required types:
        * title: string ${typeof data.title}
        * description: string ${typeof data.description}
        * code: string ${typeof data.code}
        * price: number ${typeof data.price}
        * stock: number ${typeof data.stock}
        * category: string ${typeof data.category}
      `;
      break;
    case EErrors.DATABASE_ERROR:
      errorMessage = "Error al acceder a la base de datos";
      break;
    case EErrors.ROUTING_ERROR:
    default:
      errorMessage = "Error en la ruta";
      break;
  }
  return errorMessage;
};

// Función para generar el mensaje de error
const generateCartErrorInfo = (cart, errorType) => {
  let errorMessage = "";
  switch (errorType) {
    case EErrors.INVALID_TYPES_ERROR:
      errorMessage = `One or more products have invalid types:
        List of required types:
        * product: mongoose.Schema.Types.ObjectId ${typeof cart.product}
        * quantity: number ${typeof cart.quantity}
      `;
      break;
    case EErrors.DATABASE_ERROR:
      errorMessage = "Error al acceder a la base de datos";
      break;
    case EErrors.ROUTING_ERROR:
    default:
      errorMessage = "Error en la ruta";
      break;
  }
  return errorMessage;
};

// Función para generar el mensaje de error
const generateSessionErrorInfo = (session, errorType) => {
  let errorMessage = "";
  switch (errorType) {
    case EErrors.INVALID_TYPES_ERROR:
      errorMessage = `One or more products have invalid types:
        List of required types:
        * username: string ${typeof session.username}
        * password: string ${typeof session.password}
      `;
      break;
    case EErrors.DATABASE_ERROR:
      errorMessage = "Error al acceder a la base de datos";
      break;
    case EErrors.ROUTING_ERROR:
    default:
      errorMessage = "Error en la ruta";
      break;
  }
  return errorMessage;
};

const generateTicketErrorInfo = (ticket, errorType) => {
  let errorMessage = "";
  switch (errorType) {
    case EErrors.INVALID_TYPES_ERROR:
      errorMessage = `One or more products have invalid types:
        List of required types:
        * code: string ${typeof ticket.code}
        * purchase_datetime: string ${typeof ticket.purchase_datetime}
        * amount: number ${typeof ticket.amount}
        * purchaser: string ${typeof ticket.purchaser}
      `;
      break;
    case EErrors.DATABASE_ERROR:
      errorMessage = "Error al acceder a la base de datos";
      break;
    case EErrors.ROUTING_ERROR:
    default:
      errorMessage = "Error en la ruta";
      break;
  }
  return errorMessage;
};

const generateUserCartErrorInfo = (user, errorType) => {
  let errorMessage = "";
  switch (errorType) {
    case EErrors.INVALID_TYPES_ERROR:
      errorMessage = `One or more products have invalid types:
        List of required types:
        * email: string ${typeof user.email}
        * cartId: string ${typeof user.cartId}
      `;
      break;
    case EErrors.DATABASE_ERROR:
      errorMessage = "Error al acceder a la base de datos";
      break;
    case EErrors.ROUTING_ERROR:
    default:
      errorMessage = "Error en la ruta";
      break;
  }
  return errorMessage;
};

const generateAuthErrorInfo = (user, errorType) => {
  let errorMessage = "";
  switch (errorType) {
    case EErrors.INVALID_TYPES_ERROR:
      errorMessage = `One or more products have invalid types:
        List of required types:
        * email: string ${typeof user.email}
        * cartId: string ${typeof user.cartId}
      `;
      break;
    case EErrors.DATABASE_ERROR:
      errorMessage = "Error al acceder a la base de datos";
      break;
    case EErrors.ROUTING_ERROR:
    default:
      errorMessage = "Error en la ruta";
      break;
    case EErrors.AUTH_ERROR:
      errorMessage = "Error de autenticación";
      break;
  }
  return errorMessage;
};

export {
  generateProductErrorInfo,
  generateCartErrorInfo,
  generateSessionErrorInfo,
  generateTicketErrorInfo,
  generateUserCartErrorInfo,
  generateAuthErrorInfo,
};
