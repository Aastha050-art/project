
const Listing=require("./model/Llisting.js");
const Review = require("./model/Reviews");
const ExpressError=require("./utils/ExpressError")
const listingSchema= require("./schema.js");
const reviewSchema= require("./schema.js")
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in ");
        
        return res.redirect("/login");
    }
    next()
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you dont have permission")
   return res.redirect("/listing/:id")
    }
    next()
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let{id,reviewID}=req.params;
    let review=await Review.findById(reviewID);
    console.log(id)
    console.log("re:",reviewID)
    if(!review){
        req.flash("error","Review not found");
        return res.redirect(`/listing/${id}`);
    }
    if(!review.author.equals(res.locals.currUser._id)){
       req.flash("error","you dont have permission")
   return res.redirect(`/listing/${id}`)
    }
    next()
}
module.exports.validatelisting=(req,res,next)=>{
let{error}=listingSchema.validate(req.body)
console.log(error)
if(error){
let errmsg=error.details.map((el)=>el.message).join(",");
throw new ExpressError(400,errmsg);

}else{
    next()
}
}
module.exports. validatereview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body)
    console.log(error)
    if(error){
    let errmsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errmsg);
    
    }else{
        next()
    }
    }