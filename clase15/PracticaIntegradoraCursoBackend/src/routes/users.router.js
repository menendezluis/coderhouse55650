import {Router} from 'express';
import Users from '../dao/dbManagers/users.js';

const usersManager = new Users();
const router = Router();

router.get('/', async (req,res)=>{
    let users = await usersManager.getAll();
    if(!users) return res.status(500).send({status:"error",error:"Couldn't get users due to internal error"})
    res.send({status:"success",payload:users})
})

router.post('/',async(req,res)=>{
    let {first_name,last_name,dni,email,birthDate,gender} = req.body;
    if(!first_name||!last_name||!dni||!email||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    //Muy importante! La inserción actual de la fecha de nacimiento está pensada para hacerse en el formato
    // MM - DD - YYYY. De otra forma, arrojará un error. puedes enseñar a tus estudiantes el parseo que tú necesites
    //para llegar a este formado, por defecto, se espera que se mande así desde postman.
    let result = await usersManager.saveUser({
        first_name,
        last_name,
        email,
        dni,
        birthDate,
        gender
    })
    if(!result) return res.status(500).send({status:"success",payload:result})
    res.send({status:"success",payload:result})
})

export default router;