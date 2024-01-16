import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/user.model.js";
import { CourseModel } from "./models/courses.model.js";
import { StudentModel } from "./models/students.collection.js";
//import loadUsers from "./loader.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/performance";
const app = express();

console.log("Hola mundo");

const environment = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});

environment.on("error", (error) => console.log(`Error en servidor ${error}`));

const performance = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Base de datos conectada");
    /**************indexacion  ***************** */
    /* const result = await UserModel.find({ first_name: "Celia" }).explain(
      "executionStats"
    );
    console.log(result);

    //loadUsers();
    */

    /**************populate  ***************** */
    // insertamos cursos enn el modelo coursemodel
    /* await CourseModel.create({
      title: "curso backend",
      description: "es un curso muy completo con nodejs y express",
      difficulty: 5,
      topics: [
        "Javascript",
        "servidores",
        "motores de plantilla",
        "express",
        "middleware",
        "base de datos",
      ],
      teacher: "Luis",
    });
    */
    /*const response = await CourseModel.find();
    console.log(response);
*/
    /*
    const result = await StudentModel.create({
      first_name: "Juana",
      last_name: "Perez",
      email: "juana.perez@gmail.com",
      gender: "F",
    });
*/
    //curso backend 65a5d5e09d90d913ae73e4b9
    //65a5d700eca1cad2f1fba34c usuario juana perez

    /* await StudentModel.findByIdAndUpdate("65a5d700eca1cad2f1fba34c", {
      $push: {
        Courses: "65a5d5e09d90d913ae73e4b9",
      },
    });
*/
    /*
    const result = await StudentModel.findById(
      "65a5d700eca1cad2f1fba34c"
    ).populate("Courses");
    */

    //console.log(result);

    // usando el middleware de pre

    const result = await StudentModel.findOne({
      first_name: "Juana",
    });

    console.log(result);
  } catch (error) {
    console.log("Error en conexión a base de datos", error);
  }
};

performance();
