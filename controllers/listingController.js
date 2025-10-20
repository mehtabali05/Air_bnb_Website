const Listing = require("../models/listing");

module.exports.index = async (req,res,next) =>{
    const allListings = await Listing.find();
    // console.log(allListings);
    res.render("listings/index.ejs",{allListings});
}


module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
}



module.exports.showListing = async (req,res,next)=>{
    let {id} = req.params;
    let singleListing = await Listing.findById(id)
    .populate({path: "reviews",
        populate: {path:"author"}
    }).populate("owner");
    if(!singleListing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    // console.log(singleListing);
    res.render("listings/show.ejs",{singleListing});
}



module.exports.postListing = async (req,res,next) =>{
    let url = req.file.path;
    // console.log(url);
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
   
}


module.exports.getEditForm = async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id); 
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}




module.exports.editPostListing = async (req,res,next) =>{
    let {id} = req.params;
    
    let updateData = req.body.listing || {};
    
    let listing = await Listing.findByIdAndUpdate(id, updateData, {new:true, runValidators:true});
    
    
    if(req.file){ 
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = {url,filename};
        await listing.save();
    }
    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}



module.exports.destroyListing = async (req,res,next) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}