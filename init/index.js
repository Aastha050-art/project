const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing=require("../model/Llisting.js")
const MongoURL="mongodb://127.0.0.1:27017/wanderLust";

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(MongoURL)
}
 const initDB= async()=>{
    await Listing.deleteMany();
    initData.data=initData.data.map((obj)=>({...obj,owner:"67fbaf7233d1f4726f819e80"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialiZe");

 };

 initDB();
