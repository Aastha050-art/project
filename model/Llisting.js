
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
        default:
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'  ,    
        set:(v)=>
            v===""
        ?'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
        :v,}
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
