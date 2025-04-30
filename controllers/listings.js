const Listing=require("../model/Llisting.js")
module.exports.index=async(req,res)=>{
    let allList= await Listing.find();
    res.render("index.ejs",{allList})
}
module.exports.newlistform=(req,res)=>{
    console.log("hello")
    res.render("newlisting.ejs")
}
module.exports.show=async(req,res,next)=>{
    
    let{id}=req.params;
    let allList= await Listing.findById(id)
    .populate({path:"review",
        populate:{
            path:"author",
        },

    }).populate("owner")
  
    res.render("show.ejs",{allList});

}
module.exports.edit=async (req,res)=>{
    let {id}=req.params;
    let allList= await Listing.findById(id); 
    console.log(allList);
    console.log("hello")
    let Origanalimageurl=allList.image.url;
   let newimageurl=Origanalimageurl.replace("/upload","/upload/h_250,w_150")
    
    res.render("edit.ejs",{allList,newimageurl})}
module.exports.newlist=async(req,res,next)=>{
    //let{title,description,url,price,location,country}=req.body;
    let url=req.file.path
    let filename=req.file.filename;
    console.log(url,"...",filename)

    
    let listing =req.body.listing;
    let newList= new Listing({
        title:listing.title,
        description:listing.description,
     image:{url,

               filename},
       price:listing.price,
        location:listing.location,
        country:listing.country
    })
   newList.owner=req.user._id
    console.log(newList)
    console.log(req.body.listing)

    await newList.save()
    req.flash("success","New Listing Created")
    res.redirect("/listing")
}


module.exports.editupdate=async(req,res)=>{
    let{id}=req.params
    console.log(id)
   
    let listing =req.body.listing;
    
    if(!listing){
        throw new ExpressError(400,"send valid data for listing")
    }
   
   
    //let{ title:title,description:description,price:price,location:location,country:country,url:url,}=req.body;
    let updatedChat = await Listing.findByIdAndUpdate(id,req.body.listing,
        {title:listing.title,description:listing.description,price:listing.price,location:listing.location,country:listing.country,url:listing.url},
        {runValidators:true,new:true}
    );
    if(typeof req.file!=="undefined"){
        let url=req.file.path
        let filename=req.file.filename;
        updatedChat.image={url,filename}
        await updatedChat.save();
    }
    console.log(updatedChat)
    req.flash("success"," Listing Updateded")
    res.redirect("/listing");}

 module.exports.destroy=async(req,res)=>{
        let{id}=req.params;
        let deleteList= await Listing.findByIdAndDelete(id);
        console.log("deleteList")
        console.log(deleteList)
        req.flash("success","Listing Deleted")
        res.redirect("/listing")
    }