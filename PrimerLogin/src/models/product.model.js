import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    code: {
       type: String,
       unique: true,
       require: true,
    },
    category: {
        type: String,
        require: true,
    }
})
productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model(productCollection, productSchema)