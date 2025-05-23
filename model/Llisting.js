
const mongoose=require("mongoose");
const Review=require("./Reviews.js");
const User=require("./User.js")
const listingSchema= new mongoose.Schema({
    title:{ 
        
        type:String,
        required:true
    },
    description:{
       type:String,
       required:true
    },
    image:{
        
        url:{type:String,
        filename:String,}
    },
    price:{
        type:Number,
        required:true
    },
    location:{
       type:String,
       required:true
    },
    country:{
       type:String,
       required:true
    },
    review:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Review",
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    await Review.deleteMany({_id:{$in:listing.review}})
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
