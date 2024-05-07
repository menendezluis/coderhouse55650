import { coursesService } from '../repositories/services.js';

const getCourses = async(req,res)=>{
    let courses = await coursesService.getAllCourses();
    res.send({status:"success",payload:courses})
}
const createCourse = async(req,res)=>{
    const {title,description} = req.body;
    let newCourse = {
        title,
        description,
        users:[],
        teacher:'sin asignar'
    }
    const result = await coursesService.createCourse(newCourse);
    res.send({status:"success",payload:result});
}

export default {
    createCourse,
    getCourses
}