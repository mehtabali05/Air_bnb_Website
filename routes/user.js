const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { renderSignupForm, registerUserAndLogin, renderLoginForm, loginAndIsAuthenticated, logoutUser } = require("../controllers/userController.js");


router.get("/signup",renderSignupForm);


router.post("/signup",wrapAsync(registerUserAndLogin));


router.get("/login",renderLoginForm);


router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect: "/login",failureFlash:true}),
    loginAndIsAuthenticated
);


router.get("/logout",logoutUser)

module.exports = router;