import passport from "passport";
import local from 'passport-local';
import { userService } from "../repositories/services.js";
import { createHash, isValidPassword} from "../utils.js";
import jwt, { ExtractJwt } from 'passport-jwt';
import config from "./config.js";


const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const initializePassport = async() =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false},
    async(req,email,password,done)=>{
        try{
            const {first_name,last_name,birthDate,dni,gender} = req.body;
            if(!first_name||!last_name||!password||!birthDate||!dni) return done(null,false,{message:"Incomplete values"})
            //¿El usuario ya está en la base de datos?
            const exists = await userService.getBy({email:email});
            if(exists) return done(null,false,{message:"User already exists"})
            const hashedPassword = await createHash(password);
            //Insertamos en la base
            const newUser = {
                first_name,
                last_name,
                email,
                birthDate,
                gender,
                dni,
                password:hashedPassword
            }
            let result = await userService.createUser(newUser);
            //SI TODO SALIÓ BIEN EN LA ESTRATEGIA
            return done(null,result)
        }catch(error){
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email',session:false},async(email,password,done)=>{
        try{
            const user = await userService.getBy({email})
            if(!user) return done(null,false,{messages:"No user found"});
            const passwordValidation = await isValidPassword(user,password)
            if(!passwordValidation) return done(null,false,{messages:"Incorrect password"});
            return done(null,user);
        }catch(err){
            return done(err);
        }
    }))

    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:config.jwt.SECRET,
    },async(jwt_payload,done)=>{
        try{
            return done(null,jwt_payload);
        }catch(error){
            return done(error);
        }
    }))


    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await userService.findOne({_id:id})
        return done(null,result);
    })
}

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies[config.jwt.COOKIE]
    }
    return token;
}
export default initializePassport;