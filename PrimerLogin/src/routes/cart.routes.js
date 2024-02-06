import { Router } from "express";
import ManagerMongoDb from "../dao/ManagerMongoDb.js";


const router = Router();
const cartManager = new ManagerMongoDb.CartManager();

router.get('/', async (req, res) => {
    try{
        const cart = await cartManager.getCart()
        res.send(cart)
    }
    catch (err){
        res.status(500).send(err.message)
    }
})


router.post('/', async (req, res) => {
    try{
        const response = await cartManager.createCart([])
        res.send(response)
    }
    catch (err){
        res.status(500).send(err.message)
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    const {cid} = req.params;
    const {pid} = req.params;
    let {quantity} = req.body
    try {
        const response = await cartManager.addProductToCart(cid, pid, quantity);
        res.send(response);
      } catch (err) {
        res.status(500).send(err.message);
      }
})
router.delete('/:cid/products/:pid', async (req, res) => {
    const {cid} = req.params;
    const {pid} = req.params;

    try {
        const response = await cartManager.removeProductFromCart(cid, pid);
        res.send({
            message: 'Product deleted successfully',
            id: pid
        })
      } catch (err) {
        res.status(500).send(err.message);
      }
})

router.delete('/:cid' , async (req,res)=>{
    const {cid} = req.params;
    try {
        const response = await cartManager.deleteAllProductCart(cid);
        res.send({
            message: 'Cart deleted successfully',
            id: cid
        })
    }
    catch (err) {
        req.status(500).send(err.message)
    }
})

export default router