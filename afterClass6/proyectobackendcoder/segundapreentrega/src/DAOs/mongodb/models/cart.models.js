import mongoose, { Schema } from 'mongoose'


const cartCollection = 'cart'
const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }],
        default: [],
    },
})

cartSchema.pre(['find', 'findOne'], function () {
    this.populate({path: 'products.product', select: 'title price thumbnail'})
})

export const cartModel = mongoose.model(cartCollection, cartSchema)