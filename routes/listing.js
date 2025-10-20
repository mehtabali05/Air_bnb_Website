// RESTRUCTURING ROUTES

const express = require("express");
const router = express.Router();

// REQUIRING UTILITY FUNCTION WRAPASYNC
const wrapAsync = require("../utils/wrapAsync.js");


// REQUIRING MIDDLEWARE IS-LOGGED-IN
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");


// REQUIRING CONTROLLERS
const { index, renderNewForm, showListing, postListing, getEditForm, editPostListing, destroyListing } = require("../controllers/listingController.js");


// REQUIRING MULTER 
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



// CREATING API FOR ALL LISTINGS
router.get("/", wrapAsync(index));


// CREATING API FOR ADD NEW LISTING
router.get("/new",isLoggedIn,renderNewForm);



// API FOR INDIVIDUAL DATA SHOW LISTING
router.get("/:id", wrapAsync(showListing));



// CREATING API FOR POST NEW LISTING IN ALL LISTING
router.post("/",
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(postListing));





// CREATING ROUTE FOR PUT REQUEST
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(getEditForm));

 


router.put("/:id",
    isOwner,
    upload.single('listing[image]'), 
    validateListing, 
    wrapAsync(editPostListing));




// DESTROY ROUTE
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(destroyListing));



module.exports = router;