import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength : 50
    },
    description : {
        type : String , 
        required : true,
        maxlength : 300
    },
    userId : {
        type : String,
        required : true
    },
    state : {
        type : Boolean,
        default : false,
        required : true
    },
});

const Task = mongoose.model("Task" , taskSchema);
export default Task;