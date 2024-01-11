import { CourseModel } from "../models/course.js";

export default class Courses {
  constructor() {
    console.log("Working courses with database in mongodb");
  }

  async getAll() {
    let courses = await CourseModel.find().lean();
    return courses;
  }

  async getById(id) {
    let course = await CourseModel.findById(id).lean();
    return course;
  }

  async saveCourse(course) {
    let newCourse = new CourseModel(course);
    let result = await newCourse.save();
    return result;
  }

  async updateCourse(id, course) {
    const result = await CourseModel.updateOne({ _id: id }, course);
    return result;
  }

  async deleteCourse(id) {
    //const result = await CourseModel.deleteOne({ _id: id });
    const result = await CourseModel.findByIdAndDelete(id);
    return result;
  }
}
