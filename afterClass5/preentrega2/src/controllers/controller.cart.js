import { Router } from 'express'
import { cartsModel } from '../DAOs/mongodb/models/carts.models.js'

const router = Router()


router.get('/', async (req, res) => {
    try{
        const carts = await cartsModel.find()
        res.json({ message: carts })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartsModel.findById(cid)
        res.json({ message: cart })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await cartsModel.updateOne({ _id: cid }, { $push: { products: { product: pid } } })
        res.json({ message: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { qty } = req.body
        const result = await cartsModel.updateOne({ _id: cid, }, { $set: { 'products.$.quantity': qty }})
        res.json({ message: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await cartsModel.deleteOne({ _id: cid }, { $pull: { products: { product: pid }}})
        res.json({ message: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

export default router



