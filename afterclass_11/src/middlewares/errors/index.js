import EErrors from "../../services/errors/enum.js";

export default (err, req, res, next) => {
  console.log(err);
  switch (err.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.send({
        status: "error",
        err: err.name,
        message: err.message,
      });
      break;
    case EErrors.DATABASE_ERROR:
      res.send({
        status: "error",
        err: err.name,
        message: err.message,
      });
      break;
    case EErrors.ROUTING_ERROR:
      res.send({
        status: "error",
        err: err.name,
        message: err.message,
      });
      break;
    case EErrors.AUTH_ERROR:
      res.send({
        status: "error",
        err: err.name,
        message: err.message,
      });
    default:
      res.send({
        status: "error",
        err: "unhandled err",
      });
      break;
  }
  next();
};
