import express from "express";
import userRoute from "./routes/user.js";
import errorHandler from "./middleware/errorHandler/index.js";
import EErrors from "./services/enum.js";
import CustomError from "./services/CustomError.js";

const app = express();

const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use("/api/user", userRoute);
app.get("*", (req, res) => {
  CustomError.createError({
    name: "Estas perdido",
    cause: req.url,
    message: "La ruta que buscas no existe",
    code: EErrors.ROUTING_ERROR,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
