import passport from 'passport';
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import User from "./models/user.js";
import Product from "./models/products.js";
import SentOrder from './models/sentOrder.js';
import Order from "./models/orders.js";
import mongoose from "mongoose";
import sentOrder from './models/sentOrder.js';
import UserData from './models/userData.js';

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
    console.log("Body.data: \n" + JSON.stringify(req.body));
    new UserData({
        username: req.body.username,
        user: {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            phone:req.body.phone,
            payment:req.body.payment===1?"Gotówka":"Przelew"
        },
        destination:{
            place:req.body.place,
            address:{
                city:req.body.city,
                street:req.body.street,
                number:req.body.streetNumber
            }}
    }).save()
    .then(result => {
      console.log("Created new UserData in DB: \n" + result);
      User.register(new User({username: req.body.username}), req.body.password, function(err) {
        if (err) {
             console.log('error while user register!', err);
        } else{
            console.log('New User registered!');
            res.redirect("/login")
        }
        })})
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.get("/logout", (req,res) => {
    req.logout(function(err) {
        if (err) { console.log(err);}
    });
    res.redirect("/");
});
router.get("/products", async function (req,res,next){
    if(req.isAuthenticated()){
        try {
        const answer = await Product.find({});
        res.send(answer);
        }
        catch(error) {
        return next(error);
        }
    } else{
        res.render("signup.ejs");
    }
  });
  router.get("/history", async function (req,res,next){
    console.log("Req: \n" + req.body)
    if(req.isAuthenticated()){
        try {
        const answer = await SentOrder.find({});
        res.send(answer);
        }
        catch(error) {
        return next(error);
        }
    } else{
        res.render("signup.ejs");
    }
  });
router.post("/testSave", async function (req,res,next){
    // console.log(req.body);
    // const order = new Order({
    //     _id: new mongoose.Types.ObjectId(),
    //     data: req.body.data,
    //     date: req.body.date
    //   });
    //   order
    const sentOrder0 = new sentOrder({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        destination: req.body.destination,
        order: req.body.order
    });
    sentOrder0
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Handling POST requests to /orders",
            createdOrder: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  });
router.all("/", function(req, res) {
    res.redirect("/home");
  });

  // < -- REACT PAGES --> 
const react_pages = [
    "/dashboard",
    "/dashboard-orders",
    "/dashboard-discounts",
    "/dashboard-products",
    "/dashboard-history-last-month",
    "/dashboard-history-ytd",
    "/dashboard-history-all",
];
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