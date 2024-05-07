import mongoose from 'mongoose';

const courseCollection = 'Courses';

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
        type:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Users'
            }
        ],
        default:[]
    }
})

const coursesModel = mongoose.model(courseCollection,coursesSchema);
export default coursesModel;