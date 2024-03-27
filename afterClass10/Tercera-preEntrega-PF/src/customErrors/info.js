export const generateUserErrorInfo = (user) => {
  return `One or more fields are missing or invalid in the user.
    List of required properties:
    * first_name: needs to be a string, received ${user.first_name}
    * last_name: needs to be a string, received ${user.last_name}
    * email: needs to be a string, received ${user.email}`;
};

export const generateInvalidProductErrorInfo = (product) => {
  return `One or more fields are missing or invalid in the product.
    List of required properties:
    * name: needs to be a string, received ${product.name}
    * price: needs to be a number, received ${product.price}
    * stock: needs to be a number, received ${product.stock}`;
};

//propertie deberia de contener un array de propiedades que no son validas y su tipo de dato
export const genericInvalidErrorInfo = (message, properties) => {
  let temporalMessage = message;
  let listOfProperties = "";
  properties.forEach((property) => {
    listOfProperties += `* ${property.name}: needs to be a ${property.type}, received ${property.value}\n`;
  });
  return `${temporalMessage}
    ${listOfProperties}`;
};
