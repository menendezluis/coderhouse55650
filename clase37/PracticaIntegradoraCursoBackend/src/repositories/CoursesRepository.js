export default class CoursesRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllCourses = () =>{
        return this.dao.getAll();
    }
    getCourseById =(id) =>{
        return this.dao.getById(id);
    }
    createCourse = (course) =>{
        return this.dao.saveCourse(course);
    }
    update = (id,course) =>{
        return this.dao.updateCourse(id,course);
    }
}