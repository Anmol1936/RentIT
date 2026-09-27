if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/expressError.js");
const session=require("express-session");
const MongoStore = require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const reviewRouter=require("./routes/review.js");
const listingRouter=require("./routes/listing.js");
const userRouter=require("./routes/user.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/rentIt";
const dbUrl=process.env.DB_URL || "mongodb://127.0.0.1:27017/RentIt";

const clientPromise = mongoose.connect(dbUrl)
    .then(() => {
        console.log("connected to DB");
        console.log("Using DB URL:", dbUrl);
        return mongoose.connection.getClient();
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    clientPromise,
    collectionName: "sessions",
    touchAfter: 24*3600,
});

store.on("error", (err) =>{
    console.log("Error in mongo session store",err);
});

const sessionOptions = {
    store,
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};

// app.get("/",(req,res)=>{
//     res.send("i am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => { 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user || null; 
    next();
});

app.get("/demouser", async (req,res) => {
    let fakeUser=new User({
        email:"ladla@gmail.com",
        username:"ladla",
    });
    let registeredUser=await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

app.all("/{*splat}", (req,res,next) => {
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{message, currUser: res.locals.currUser, success: res.locals.success, error: res.locals.error});
    // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("server is running on port 8080");
});