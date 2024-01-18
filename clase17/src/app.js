import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import studenRouter from "./routes/students.route.js";
import { __dirname } from "./utils.js";
//import { OrderModel } from "./models/order.model.js";
//import { StudentModel } from "./models/students.model.js";
//import { generateRandomName } from "./randomNames.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/pizzeria";

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/students", studenRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export const environment = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log(error);
  }
};

environment();

/*const respuesta = await StudentModel.paginate(
      {},
      {
        limit: 5,
        page: 1,
      }
    );
    console.log(respuesta);*/
//agregate
//let students = [];
/*for (let i = 0; i < 100; i++) {
      students.push(generateRandomName());
    }*/
/*const result = await StudentModel.aggregate([
      {
        $group: {
          _id: "$group",
          avgGrade: { $avg: "$grade" },
          totalStudents: { $sum: 1 },
        },
      },
      { $sort: { avgGrade: -1 } },
    ]);
    console.log(result);
    /* console.log("Base de datos conectada");

    //const pizzas = await OrderModel.find();
    const report = await OrderModel.aggregate([
      {
        $match: { size: "xlarge" },
      },
      {
        $group: {
          _id: "$name",
          total: { $sum: "$quantity" },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $group: {
          _id: 1,
          orders: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          _id: 0,
          orders: "$orders",
        },
      },
      {
        $merge: {
          into: "reports",
        },
      },
    ]);
    console.log(report);

//script de insercion de pizzas
/*OrderModel.insertMany([
      {
        name: "Margherita",
        size: "medium",
        price: 12.99,
        quantity: 50,
        date: new Date("2024-01-17T12:00:00Z"),
      },
      {
        name: "Margherita",
        size: "medium",
        price: 12.99,
        quantity: 50,
        date: new Date("2024-01-17T12:00:00Z"),
      },
      {
        name: "Margherita",
        size: "medium",
        price: 12.99,
        quantity: 50,
        date: new Date("2024-01-17T12:00:00Z"),
      },
      {
        name: "Margherita",
        size: "medium",
        price: 12.99,
        quantity: 50,
        date: new Date("2024-01-17T12:00:00Z"),
      },
      {
        name: "Pepperoni Feast",
        size: "large",
        price: 16.99,
        quantity: 30,
        date: new Date("2024-01-18T15:30:00Z"),
      },
      {
        name: "Vegetarian Delight",
        size: "small",
        price: 14.99,
        quantity: 40,
        date: new Date("2024-01-19T09:45:00Z"),
      },
      {
        name: "Supreme Extravaganza",
        size: "xlarge",
        price: 19.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anchoas",
        price: 25,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "queso y tocino",
        size: "xlarge",
        price: 19.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Panceta Ciruela",
        size: "small",
        price: 50.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anana y jamon crudo",
        size: "xlarge",
        price: 80.99,
        quantity: 20,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Anchoas",
        size: "xlarge",
        price: 49.99,
        quantity: 30,
        date: new Date("2024-01-20T18:20:00Z"),
      },
      {
        name: "Champinones  y pimientos",
        price: 49.99,
        quantity: 30,
        date: new Date("2024-01-20T18:20:00Z"),
      },
    ]);*/
