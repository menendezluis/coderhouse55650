import express from "express";
import orderRouter from "./routes/orders.routes.js";
import businessRouter from "./routes/business.routes.js";
import userRouter from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", orderRouter);
app.use("/business", businessRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
