import { Router } from 'express';
import passport from 'passport';
import coursesController from '../controllers/courses.controller.js';
import applyPolicy from '../middleware/auth.middleware.js';
const router = Router();
router.use(passport.authenticate('current',{session:false}))

router.get('/',applyPolicy(['STUDENT']),coursesController.getCourses)

router.post('/',applyPolicy(['TEACHER']),coursesController.createCourse);

export default router;