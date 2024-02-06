import mongoose from "mongoose";

const registroCollection = 'Registro';

const registroSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    age: Number,
    password: {
        type: String,
        require: true
    }
})

const registroModel = mongoose.model(registroCollection, registroSchema)

export default registroModel