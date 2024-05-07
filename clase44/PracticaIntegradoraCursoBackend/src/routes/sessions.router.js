import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";


const router = Router();

router.post('/register',passport.authenticate('register',{passReqToCallback:true,session:false,failureRedirect:'api/sessions/failedRegister',failureMessage:true}),sessionsController.register);
router.get('/failedRegister',sessionsController.failedRegister)
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failedLogin',session:false}),sessionsController.login)
router.get('/failedLogin',sessionsController.failedLogin);
router.get('/current',passport.authenticate('current',{session:false}),sessionsController.getCurrentUser);

export default router;