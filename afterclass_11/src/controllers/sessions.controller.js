import { usersService } from "../repository/index.js";
import UsersDto from "../dao/DTOs/users.dto.js";
import { generateToken, createHash, isValidPassword } from "../utils/utils.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateSessionErrorInfo } from "../services/errors/info.js";
import MailingService from "../services/mailing.js";

// Ruta que realiza el registro de usuario
async function signupUser(req, res) {
  req.logger.info(`Usuario creado con éxito ${new Date().toLocaleString()}`);
  res.status(200).json({ message: "Usuario creado con éxito" });
}

// Ruta que se ejecuta cuando falla el registro de usuario
async function failRegister(req, res, next) {
  const result = [];
  req.logger.error(
    `Error de base de datos: Error al crear el usuario ${new Date().toLocaleString()}`
  );
  CustomError.createError({
    name: "Error de base de datos",
    cause: generateSessionErrorInfo(result, EErrors.DATABASE_ERROR),
    message: "Error al crear el usuario",
    code: EErrors.DATABASE_ERROR,
  });
  next();
}

// Ruta que realiza el inicio de sesión de usuario
async function loginUser(req, res, next) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      const result = [username, password];
      req.logger.error(
        `Error de tipo de dato: Error de inicio de sesión ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateSessionErrorInfo(result, EErrors.INVALID_TYPES_ERROR),
        message: "Error de inicio de sesión",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    } else {
      const result = await usersService.getOneUser(username);
      if (
        result.length === 0 ||
        !isValidPassword(result[0].password, password)
      ) {
        req.logger.error(
          `Error de base de datos: Usuario no encontrado ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de base de datos",
          cause: generateSessionErrorInfo(result, EErrors.DATABASE_ERROR),
          message: "Usuario no encontrado",
          code: EErrors.DATABASE_ERROR,
        });
      } else {
        const myToken = generateToken({
          first_name: result[0].first_name,
          username,
          password,
          role: result[0].role,
        });
        req.logger.info(
          `Login realizado con éxito ${new Date().toLocaleString()}`
        );
        res.json({ message: "Login realizado con éxito", token: myToken });
      }
    }
  } catch (error) {
    next(error);
  }
}

// Ruta que se ejecuta cuando falla el inicio de sesión de usuario
async function failLogin(req, res, next) {
  const result = [];
  req.logger.error(
    `Error de base de datos: Error al iniciar sessión ${new Date().toLocaleString()}`
  );
  CustomError.createError({
    name: "Error de base de datos",
    cause: generateSessionErrorInfo(result, EErrors.DATABASE_ERROR),
    message: "Error al iniciar sessión",
    code: EErrors.DATABASE_ERROR,
  });
  return next();
}

// Ruta que realiza el envío de correo de recuperación de contraseña
async function forgotPassword(req, res, next) {
  const { username } = req.body;
  try {
    if (!username) {
      const result = [username];
      req.logger.error(
        `Error de tipo de dato: Error al actualizar la contraseña ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateSessionErrorInfo(result, EErrors.INVALID_TYPES_ERROR),
        message: "Error al actualizar la contraseña",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const user = await usersService.getOneUser(username);

    if (user.length === 0) {
      req.logger.error(
        `Error de base de datos: Usuario no encontrado ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateSessionErrorInfo(user, EErrors.DATABASE_ERROR),
        message: "Usuario no encontrado",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      const passwordToken = generateToken({ username });
      const mailer = new MailingService();
      const sendEmail = await mailer.sendSimpleMail({
        from: "E-Store",
        to: username,
        subject: "Recuperación de contraseña",
        html: ` 
          <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
              <h2 style="text-align: center; color: #333;">Recuperación de Contraseña</h2>
              <p>Estimado/a ${user[0].first_name},</p>
              <p>Te enviamos este correo electrónico porque solicitaste restablecer tu contraseña. Para completar el proceso por favor sigue las instrucciones:</p>
              <p><strong>Paso 1:</strong> Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
              <p><a href="http://127.0.0.1:5500/html/newPassword.html?token=${passwordToken}" style="text-decoration: none; background-color: #4caf50; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px;">Restablecer Contraseña</a></p>
              <p><strong>Paso 2:</strong> Una vez que hagas clic en el enlace, serás redirigido/a a una página donde podrás crear una nueva contraseña segura para tu cuenta.</p>
              <p>Si no solicitaste restablecer tu contraseña, por favor ignora este mensaje. Tu información de cuenta sigue siendo segura y no se ha visto comprometida.</p>
              <p>Atentamente,</p>
              <p><strong>E-Store</strong><br>
          </div>
            `,
      });
      req.logger.info(
        `Correo de recuperación enviado al usuario ${new Date().toLocaleString()}`
      );
      res.status(200).json({
        response: "Correo de recuperación enviado al usuario",
      });
    }
  } catch (error) {
    next(error);
  }
}

// Ruta que actualiza la contraseña del usuario
async function updatePassword(req, res, next) {
  const { newPasswordData } = req.body;
  const password = newPasswordData;
  const username = req.user.user.username;

  try {
    if (!password || !username) {
      const result = [password, username];
      req.logger.error(
        `Error de tipo de dato: Error al actualizar la contraseña ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateSessionErrorInfo(result, EErrors.INVALID_TYPES_ERROR),
        message: "Error al actualizar la contraseña",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const user = await usersService.getOneUser(username);
    const passwordExist = isValidPassword(user[0].password, password);

    if (user.length === 0) {
      req.logger.error(
        `Error de base de datos: Usuario no encontrado ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateSessionErrorInfo(user, EErrors.DATABASE_ERROR),
        message: "Usuario no encontrado",
        code: EErrors.DATABASE_ERROR,
      });
    } else if (passwordExist) {
      req.logger.error(
        `Error de base de autenticación: La contraseña no puede ser igual a la anterior ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de autenticación",
        cause: generateSessionErrorInfo(user, EErrors.DATABASE_ERROR),
        message: "La contraseña no puede ser igual a la anterior",
        code: EErrors.DATABASE_ERROR,
      });
      res
        .status(400)
        .json({ messsage: "La contraseña no puede ser igual a la anterior" });
    } else {
      const uid = user[0]._id;
      const newPassword = createHash(password);
      const result = await usersService.updateUserPassword(uid, newPassword);
      req.logger.info(
        `Contraseña actualizada con éxito ${new Date().toLocaleString()}`
      );
      res.status(200).json({
        message: "Contraseña actualizada con éxito",
      });
    }
  } catch (error) {
    next(error);
  }
}

// Ruta que actualiza el rol de usuario
async function updateUserRole(req, res, next) {
  console.log("estoy en el controlador");
  const { role } = req.body;
  const { id } = req.params;
  const username = id;
  try {
    if (!role || !username) {
      const result = [role, username];
      req.logger.error(
        `Error de tipo de dato: Error al actualizar el rol ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateSessionErrorInfo(result, EErrors.INVALID_TYPES_ERROR),
        message: "Error al actualizar el rol",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const user = await usersService.getOneUser(username);
    if (user.length === 0) {
      req.logger.error(
        `Error de base de datos: Usuario no encontrado ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateSessionErrorInfo(user, EErrors.DATABASE_ERROR),
        message: "Usuario no encontrado",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      const uid = user[0]._id;
      const result = await usersService.updateUserRole(uid, role);
      req.logger.info(
        `Rol actualizado con éxito ${new Date().toLocaleString()}`
      );
      res.status(200).json({
        message: "Rol actualizado con éxito",
      });
    }
  } catch (error) {
    next(error);
  }
}

// Ruta que devuelve el usuario actual
async function currentUser(req, res) {
  const user = new UsersDto(req.user.user);
  res.status(200).json({ data: user });
}

// Github callback
async function githubCallback(req, res) {
  req.user = req.user._json;
  res.redirect("/api/products?page=1");
}

export {
  updateUserRole,
  updatePassword,
  signupUser,
  failRegister,
  loginUser,
  failLogin,
  currentUser,
  forgotPassword,
  githubCallback,
};
