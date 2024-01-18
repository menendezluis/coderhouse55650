import { Router } from "express";
import { StudentModel } from "../models/students.model.js";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const result = await StudentModel.paginate(
      {},
      { limit: 10, page, lean: true }
    );
    const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } =
      result;
    const students = docs;
    res.render("students", {
      students,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (error) {
    console.log(error);
  }
});

export default route;
