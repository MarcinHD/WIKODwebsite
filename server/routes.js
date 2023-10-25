import passport from 'passport';
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import User from "./models/user.js";

const port = 5000;
const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/home", (req,res) => {
    setActivePage(0);
    res.render("cover.ejs",data);
});

router.get("/features", (req,res) => {
    setActivePage(1);
    res.render("feature.ejs",data);
});
router.get("/orders", (req,res) => {
    setActivePage(2);
    res.render("orders.ejs",data);
});
router.get("/contact", (req,res) => {
    setActivePage(3);
    res.render("contact.ejs",data);
});
router.get("/login", (req,res) => {
    if(req.isAuthenticated()){
        res.redirect("/dashboard");
    } else{
        res.render("login.ejs");
    }
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), function(req, res) {
    res.redirect('/dashboard');
  });

router.get("/signup", (req,res) => {
    if(req.isAuthenticated()){
        res.redirect("/dashboard");
    } else{
        res.render("signup.ejs");
    }
});
router.post("/signup", (req,res) => {
    User.register(new User({username: req.body.username}), req.body.password, function(err) {
        if (err) {
             console.log('error while user register!', err);
        } else{
            console.log('user registered!');
            res.redirect("/login")
        }
    });
});
router.all("/", function(req, res) {
    res.redirect("/home");
  });

  // < -- REACT PAGES --> 
const react_pages = ["/dashboard","/dashboard-orders"];
router.use(express.static(path.join(__dirname,"..","client","build")));
router.get(react_pages, (req,res) => {
    if(req.isAuthenticated()){
        res.sendFile(path.join(__dirname,"..","client","build","index.html"));
    } else{
        res.redirect("/login");
    }
});

  // < -- REDIRECT REST --> 
router.all("*", function(req, res) {
    res.redirect("/home");
  });

  // <-- EJS DATA AND FUNCTIONS -->
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

export default router;