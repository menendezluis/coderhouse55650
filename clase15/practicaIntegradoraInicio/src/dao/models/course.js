import mongoose from "mongoose";

const courseCollection = "course";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
});

export const CourseModel = mongoose.model(courseCollection, CourseSchema);
