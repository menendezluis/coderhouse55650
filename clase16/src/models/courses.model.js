import mongoose from "mongoose";

const courseCollection = "courses";

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  topics: {
    type: Array,
    default: [],
  },
  teacher: String,
  students: {
    type: Array,
    default: [],
  },
});

export const CourseModel = mongoose.model(courseCollection, CourseSchema);
