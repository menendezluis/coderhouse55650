import coursesModel from "../models/course.js";

export default class Courses {
  constructor() {
    console.log("Working courses with database in mongodb");
  }

  async getAll() {
    let courses = await coursesModel.find().lean();
    return courses;
  }

  async saveCourse(course) {
    let newCourse = new coursesModel(course);
    let result = await newCourse.save();
    return result;
  }

  async updateCourse(id, course) {
    const result = await coursesModel.updateOne({ _id: id }, course);
    return result;
  }
}
