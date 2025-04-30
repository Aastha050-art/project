const express=require("express");
const router=express.Router({mergeParams:true});
const Review = require("../model/Reviews.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError")
const {validatereview}=require("../middleware.js")
const Listing = require("../model/Llisting.js")
const { isLoggedIn ,isReviewAuthor}=require("../middleware.js")
const ReviewController=require("../controllers/review.js")



    

//review
router.post("/:id/review",isLoggedIn,validatereview,wrapAsync(ReviewController.review))
//delete review
router.get("/:id/review/:reviewID",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.destroy))

module.exports=router