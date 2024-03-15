import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1,
            },
            _id: false,
        },
    ],
}, { timestamps: true });
 
const Cart = mongoose.model(cartsCollection, cartSchema);

export default Cart;