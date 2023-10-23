// <-- IMPORT -->
import dotenv from "dotenv";
import express from "express";
import body from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

// <-- INITIALIZE -->
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(body.urlencoded({extended: true}));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// <-- DATABASE SETTING -->
mongoose
    .connect("mongodb://127.0.0.1:27017/Secrets", {useNewUrlParser: true})
    .then( () => console.log("connected to DB."))
    .catch( err => console.log(err + "\ncant connect to DB ..."));

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  // < -- EXPRESS ROUTER --> 
app.get("/home", (req,res) => {
    setActivePage(0);
    res.render("cover.ejs",data);
});

app.get("/features", (req,res) => {
    setActivePage(1);
    res.render("feature.ejs",data);
});
app.get("/orders", (req,res) => {
    setActivePage(2);
    res.render("orders.ejs",data);
});
app.get("/contact", (req,res) => {
    setActivePage(3);
    res.render("contact.ejs",data);
});
app.get("/login", (req,res) => {
    if(req.isAuthenticated()){
        res.redirect("/list");
    } else{
        res.render("login.ejs");
    }
});
app.post("/login", (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if(err){
            console.log(err);
            res.redirect("/login");
        } else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/list");
            });
        }
    });
});

app.get("/signup", (req,res) => {
    if(req.isAuthenticated()){
        res.redirect("/list");
    } else{
        res.render("signup.ejs");
    }
});
app.post("/signup", (req,res) => {
    User.register({username: req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect("/signup");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/list");
            });
        }
    });
});
app.all("/", function(req, res) {
    res.redirect("http://localhost:"+port+"/home");
  });

  // < -- REACT PAGES --> 
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/list", (req,res) => {
    if(req.isAuthenticated()){
        res.sendFile(path.join(__dirname,"..","client","build","index.html"));
    } else{
        res.redirect("/login");
    }
});

  // < -- REDIRECT REST --> 
app.all("*", function(req, res) {
    res.redirect("http://localhost:"+port+"/home");
  });

app.listen(port, () => {
    console.log("Server started on port:" + port);
});

// <-- DATA AND FUNCTIONS -->
const data ={
    port: port,
    activePage: [
        {
            aria: "false",
            className: "",
        },
        {
            aria: "false",
            className: "",
        },
        {
            aria: "false",
            className: "",
        },
        {
            aria: "false",
            className: "",
        }],
};

function setActivePage(e){
    data.activePage.forEach((w)=>{
            w.aria="false";
            w.className="";
        });
    data.activePage.at(e).aria="page";
    data.activePage.at(e).className="active";
}