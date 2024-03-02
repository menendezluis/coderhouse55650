import mongoose from "mongoose";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    products: [

            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'   
                },
                quantity: {
                    type: String,
                    default: 1
                }
            }
        ],
        default: []   
})

cartSchema.pre('find', function(){
    this.populate('products.product')
    
})

export const cartModel = mongoose.model(cartCollection, cartSchema) 