const { ref } = require("joi");
const mongoose=require("mongoose");
const User=require("./User")
const reviewSchema= new mongoose.Schema({
    comment:{ 
        
        type:String,
    },
    rating:{
       type:Number,
       min:0,
       max:5
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        username:{
           type:String
        },
        ref:"User"
    }
})
const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;

