import { Router } from "express";
import registroModel from "../models/registro.model.js";

const router = Router();


router.get('/', (req, res) => {
    res.render('login', {});
})

router.get('/user', async (req, res) => {
    const {email, password} = req.query
    try {
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            req.session.user = email
            req.session.admin = true
            return res.status(200).send({message:'success'})
        }else{
            const result = await registroModel.findOne({email: email, password: password})
            console.log('result', result)
            if (result){
              req.session.user = email
              req.session.admin = false
              req.session.rol = 'usuario'
              console.log('admin ',req.session.admin)
              return res.status(200).send({message:'success'})
            }else{
                res.status(401).send({message:'error'})
            }   
        }
    } catch (error) {
        res.status(500).send({error: error});
    }
    
});

const auth = async (req, res, next) => {
    console.log('auth', req.session.user)
    if (await req.session?.user){
        return next()
    }else{
        return res.status(401).send('error de autenticación')
    }
}


router.get('/products', auth, async (req,res)=>{
    if (await req.session?.user){
        if (req.session?.admin){
            const userData = await registroModel.findOne({ email: req.session.user})
            const {firstName, lastName} = userData
            return res.render('products',{firstName, lastName, admin: 'Administrador'}) 
        }
        const userData = await registroModel.findOne({ email: req.session.user})
        const {firstName, lastName} = userData
        res.render('products',{firstName, lastName}) 
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.status(401).send({message:'ERROR'})
        }else{
            res.status(200).send({message:'LogoutOK'})
        }
    })
})

export default router