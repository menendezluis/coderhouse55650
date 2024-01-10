import mongoose from 'mongoose';

const courseCollection = 'courses';

const coursesSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    teacher:{
        type:String,
        required:true
    },
    students:{
        type:Array,
        default:[]
    }
})

const coursesModel = mongoose.model(courseCollection,coursesSchema);
export default coursesModel;