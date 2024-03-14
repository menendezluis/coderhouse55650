import EErrors from "../../services/enum.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).json({
        message: error.message,
        code: error.code,
        cause: error.cause,
      });
      break;
    case EErrors.DATABASE_ERROR:
      res.status(500).json({
        message: error.message,
        code: error.code,
        cause: error.cause,
      });
      break;

    case EErrors.ROUTING_ERROR:
      res.status(404).json({
        message: error.message,
        code: error.code,
        cause: error.cause,
      });
    default:
      res.status(500).json({
        message: "Error desconocido",
        code: 0,
        cause: error,
      });
      break;
  }
};
