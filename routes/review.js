// RESTRUCTURING ROUTES

const express = require("express");
const router = express.Router({mergeParams:true});


// REQUIRING UTILITY FUNCTION WRAPASYNC
const wrapAsync = require("../utils/wrapAsync.js");


const { isLoggedIn, isReviewAuthor,reviewValidation } = require("../middleware.js");
const { newReview, destroyReview } = require("../controllers/reviewController.js");







// NEW REVIEW POST ROUTE
router.post("/",isLoggedIn,reviewValidation,wrapAsync(newReview));



// REVIEW DELETE ROUTE
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(destroyReview));


module.exports = router;