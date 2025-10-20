if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// REQUIRING EXPRESS

const express = require("express");
const app = express();
const port = 8080;

const mongoose  = require("mongoose");
const dbUrl = process.env.ATLAS_URL;

main()
    .then(() =>{
        console.log("DB Connected to Express");
    })
    .catch((err) =>{
        console.log(err);
    })

async function main(){
    mongoose.connect(dbUrl);
}


// REQUIRING PATH 
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));



// REQUIRING METHOD OVERRIDE PACKAGE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


// REQUIRING EJS-MATE PACKAGE
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);


// REQUIRING LISTINGS, USER AND REVIEWS ROUTE
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// REQUIRING COOKIE PARSER NPM PACKAGE
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));


// REQUIRING EXPRESS SESSIONS
const sessions = require("express-session");
const MongoStore  = require("connect-mongo");

const store = MongoStore.create({
    mongoUrl: dbUrl,
    cyrpto: {
        secret : process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error",(e) => {
    console.log("SESSION STORE ERROR",e);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}


// REQUIRING  AND PASSPORT AND PASSPORT-LOCAL AND USER-MODEL
const User = require("./models/user.js");
const passport = require("passport")
const LocalStrategy = require("passport-local");



// REQUIRING CONNECT-FLASH
const flash = require("connect-flash");


app.use(sessions(sessionOptions));
app.use(flash());


// INITIALIZING PASSPORT AND PASSPORT-LOCAL AND USER-MODEL

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// FLASH MIDDLEWARE
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;
    next();
})



// RESTRUCTURING ROUTER MIDDLEWARE
app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/",userRouter);


// MIDDLEWARE ERROR HANDLER DEFINITION
app.use((err,req,res,next) =>{
    let {status=500,message="Error Occured"} = err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs",{err});
});


// PORT THAT LISTENS FOR REQUESTS

app.listen(port,() =>{
    console.log(`Server listening Requests on port ${port}`);
});