import express from "express";
import userRouter from "./routes/users.js";

const app = express();

app.use("/users", userRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
