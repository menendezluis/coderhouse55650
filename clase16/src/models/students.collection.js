import mongoose from "mongoose";

const studentCollection = "students";

const StudentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  Courses: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
    default: [],
  },
});

StudentSchema.pre("find", function () {
  this.populate("Courses");
});

StudentSchema.pre("findOne", function () {
  this.populate("Courses");
});

StudentSchema.pre("findById", function () {
  this.populate("Courses");
});

export const StudentModel = mongoose.model(studentCollection, StudentSchema);
