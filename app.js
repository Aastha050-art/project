if(process.env.NODE_ENV!="production"){
    require("dotenv").config();}

console.log(process.env.CLOUD_NAME)
const dbUrl=process.env.ATLASDB_URL;
const express=require("express");
const app = express();
const mongoose= require("mongoose");
const MongoURL="mongodb://127.0.0.1:27017/wanderLust";
const path=require("path");
const methodOverride= require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError");
const session= require("express-session");
const MongoStore=require("connect-mongo");
const flash= require("connect-flash");
const User=require("./model/User.js")
const passport=require("passport");
const LocalStrategy=require("passport-local")
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}))

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")));

app.engine("ejs",ejsMate);


main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(dbUrl)
}
const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:"mysupersecretcode",
    },
    touchAfter:24*3600
})
   
store.on("error",()=>{
    console.log("Error in mongo session",err);
})

const sessionOptions={
    store,
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
};



app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.currUser=req.user
    next()
})
app.use((req,res,next)=>{
    res.locals.error=req.flash("error")
   
    next()
})
app.get("/demouser",async(req, res)=>{
    let fakeuser= new User({
        email:"student@gmail.com",
        username:"delta-student"
    });
    let registeredUser= await User.register(fakeuser,"helloworld")
    res.send(registeredUser);
})

app.get("/",(req,res)=>{
    res.send("hi,i m root")

});
app.use("/listing",listingRouter);
app.use("/listing",reviewRouter);
app.use("/",userRouter)
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.render("error.ejs",{err})
})
app.listen(8080,()=>{
    console.log("app working")
});


