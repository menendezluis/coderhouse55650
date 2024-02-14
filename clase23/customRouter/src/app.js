import express from "express";
import UserRouter from "./routes/user.js";
const app = express();

app.use(express.json());

const userRouter = new UserRouter();
app.use("/users", userRouter.router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
