import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {})
})

// router.get('/products', (req,res)=>{
//     res.render('products',{})
// })

router.get('/cart', (req,res)=>{
    res.render('carts', {})
})

export default router