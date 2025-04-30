
const User=require("../model/User");
const Listing=require("../model/Llisting");
const Review=require("../model/Reviews")


module.exports.signupform=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    try{
    let{username,email,password}=req.body;
    const newUser=new User({email,username})
  const registeredUser = await User.register(newUser,password);
  console.log(registeredUser);
  req.login(registeredUser,(err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","Welcome to wanderlust")
    res.redirect("/listing")
  })
  }catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
  }
}
module.exports.loginform=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","Welcomeback to wanderlust!!")
    console.log(res.locals.redirectUrl)
    let newRediectUrl= res.locals.redirectUrl ||"/listing"
    console.log(newRediectUrl)
    res.redirect(newRediectUrl);
}
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
      if(err){
        next(err)
      }
      req.flash("success","You are logout!!")
      res.redirect("/listing");
    })
  }