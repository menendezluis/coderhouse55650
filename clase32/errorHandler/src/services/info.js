export const generateUserErrorInfo = (user) => {
  return `One or more fields are missing or invalid in the user.
    List of required properties:
    * first_name: needs to be a string, received ${user.first_name}
    * last_name: needs to be a string, received ${user.last_name}
    * email: needs to be a string, received ${user.email}`;
};

export const generateMiercolesErrorInfo = (data) => {
  return `Usted no puede ejecutar esto porque es miercoles, regrese el manana`;
};
