import mongoose from 'mongoose'
import paginate  from 'mongoose-paginate-v2'

const productsCollection = 'product'
const productSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
    },
    stock: {
        type: Number,
    }
})

productSchema.plugin(paginate)

export const productsModel = mongoose.model(productsCollection, productSchema)