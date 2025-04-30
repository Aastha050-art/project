const express=require("express");
const router=express.Router();
const User=require("../model/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const { isLoggedIn }=require("../middleware.js")
const Usercontroller=require("../controllers/user.js")


//signupform
router
.route("/signup").get(Usercontroller.signupform)
//signup
.post(wrapAsync(Usercontroller.signup))

//loginform
router
.route("/login")
.get(Usercontroller.loginform)

//login
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),Usercontroller.login)

//logout
router.get("/logout",Usercontroller.logout)
module.exports=router;