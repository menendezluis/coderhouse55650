import { Router } from "express";
import registroModel from "../models/registro.model.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('registro', {});
})

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, age } = req.body;
    try {
        const response = await registroModel.create({ firstName, lastName, email, password, age });
        res.status(200).send({message: 'success', payload: response});
    } catch (error) {
        res.status(500).send(error.message);
    }
})


export default router