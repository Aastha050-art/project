const Listing=require("../model/Llisting");
const Review=require("../model/Reviews")


module.exports.review=async(req,res)=>{
    let review=req.body.review;
    let listing=await Listing.findById(req.params.id);
    let newReview= new Review({
        rating:review.rating,
        comment:review.comment,
        
    }) 
    newReview.author=req.user._id
    console.log(newReview)
    listing.review.push(newReview);
    
    await newReview.save()
    await listing.save()
    console.log(listing)
    
    req.flash("success","New Review Created")
    res.redirect(`/listing/${listing._id}`)
}
module.exports.destroy=async(req,res)=>{
    let{id,reviewID}=req.params;
    
    await Review.findByIdAndDelete(reviewID)
    //now we have to delete review from listing -in whichwe have review array so ,we will use pull operator.
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewID}})
    req.flash("success","Review Deleted")
    res.redirect(`/listing/${id}`);


}