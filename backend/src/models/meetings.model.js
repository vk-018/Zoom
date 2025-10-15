import mongoose from "mongoose";

const meetSchema= new mongoose.Schema({
    user_id:{
        type:String,
        //not req as a guest may also use this
    },
    meetingCode:{
        type:String,
        required: true,
    },
    passowrd: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
        
    }
    
});

const Meet= mongoose.model("Meet",meetSchema);

export default Meet;