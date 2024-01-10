import { Router } from 'express';
import Courses from '../dao/dbManagers/courses.js';

const router = Router();
const coursesManager = new Courses();

router.get('/',async(req,res)=>{
    let courses = await coursesManager.getAll();
    res.send({status:"success",payload:courses})
})

router.post('/',async(req,res)=>{
    const {title,description} = req.body;
    let newCourse = {
        title,
        description,
        users:[],
        teacher:'sin asignar'
    }
    const result = await coursesManager.saveCourse(newCourse);
    res.send({status:"success",payload:result});
})

export default router;