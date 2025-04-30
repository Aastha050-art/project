const express=require("express");
const router=express.Router();
const Listing = require("../model/Llisting.js")
const wrapAsync=require("../utils/wrapAsync.js")
const {validatelisting}=require("../middleware.js")
const { isLoggedIn,isOwner }=require("../middleware.js")
const methodOverride= require("method-override")
const ListingController=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudconfig.js")
const upload=multer({storage})



router.use(methodOverride("_method"));
//index
router.get("/", validatelisting,wrapAsync(ListingController.index))
//NweListForm
router.get("/path",isLoggedIn,ListingController.newlistform )

//Show

router.route("/:id")
.get(validatelisting,wrapAsync(ListingController.show))
//edit update
.put(isOwner ,isLoggedIn,upload.single("listing[url]"),wrapAsync(ListingController.editupdate));
//edit
router.get("/:id/edit",isLoggedIn,ListingController.edit);
//New List
router.post("/create" ,upload.single("listing[url]"),wrapAsync(ListingController.newlist))
//router.post("/create",upload.single("listing[url]"),(req,res)=>{
  //res.send(req.file)
//})
//delete 
router.get("/:id/delete",isOwner,isLoggedIn,validatelisting,wrapAsync(ListingController.destroy))
module.exports=router
//let listinguser= await Listing.findById(id)
//if(!listinguser.owner.equals(currUser._id)){
  //  req.flash("error","you dont have permission")
 //   return res.redirect("/listing/:id")
//}