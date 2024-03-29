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
import Destination from './models/destination.js';
import { error } from 'console';
import Mailjet from 'node-mailjet';
import dotenv from "dotenv";

  // < -- INITIALIZE --> 
dotenv.config();
const port = 5000;
const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const mailjetClient = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {}
    } 
);

  // < -- BOOTSTRAP PAGES --> 

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

  // < -- SERVER API--> 

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

router.post("/signup", async function(req,res){
    console.log("Body.data: \n" + JSON.stringify(req.body));

    if(!(await User.exists({username: req.body.username}))){
        new UserData({
            username: req.body.username,
            user: {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                phone:req.body.phone,
                payment:req.body.payment
            },
            destinations:{
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
                res.status(500).json({
                    error: err
                });
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
    } else{
        res.status(500).json({
            error: 'user already in DB'
        });
    }
});

router.get("/logout", (req,res) => {
    req.logout(function(err) {
        if (err) { console.log(err);}
    });
    res.redirect("/");
});

router.post('/send-email', async function(req,res){
    console.log("Wyslij wiadomosc: \n" + JSON.stringify(req.body));
    await mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
                Email: 'exampleemail123321123@gmail.com',
                Name: 'WIKOD page',
            },
            To: [
              {
                Email: 'exampleemail123321123@gmail.com',
                Name: 'WIKOD office',
              },
            ],
            Subject: 'Wiadomosc kontaktowa - WIKOD.PL',
            TextPart: 'Użytkownik: ' + req.body.firstName + 
                    '\nEmail: ' + req.body.email + 
                    '\nWiadomosc: ' + req.body.message,
          },
        ],
      })
        .then(result => {
            console.log(result.body);
            res.status(200);
            res.redirect('/contact');
        })
        .catch(err => {
            console.log(err.statusCode);
            res.status(500);
            res.send('Something went wrong ...');
        })
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
    console.log("User: " +req.user.username);
    console.log("User JSON: " + JSON.stringify(req.user));
    if(req.isAuthenticated()){
        try {
        const answer = await SentOrder.find({username: req.user.username});
        res.send(answer);
        }
        catch(error) {
        return next(error);
        }
    } else{
        res.render("signup.ejs");
    }
  });

  router.get("/user", async function (req,res,next){
    console.log("User: " +req.user.username);
    console.log("User JSON: " + JSON.stringify(req.user));
    if(req.isAuthenticated()){
        try {
        const answer = await UserData.find({username: req.user.username});
        res.send(answer);
        }
        catch(error) {
        return next(error);
        }
    } else{
        res.render("signup.ejs");
    }
  });

router.post("/save-sent-order", async function (req,res,next){
    const sentOrder0 = new sentOrder({
        _id: new mongoose.Types.ObjectId(),
        username: req.user.username,
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

router.put("/update-destination", async function (req,res,next){
    if(req.isAuthenticated()){
        try {
        const answer = await UserData.findOneAndUpdate(
            {username: req.user.username},
            {destinations:[...req.body.destinations]},
            {returnOriginal: false}
            ).then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Handling PUT requests",
                  createdOrder: result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            }
            catch(error) {
                return next(error);
            }}});

router.put("/update-userdata", async function (req,res,next){
    if(req.isAuthenticated()){
        try {
        const answer = await UserData.findOneAndUpdate(
            {username: req.user.username},
            {user:{...req.body.data}},
            {returnOriginal: false}
            ).then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Handling PUT requests",
                  createdOrder: result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            }
            catch(error) {
                return next(error);
            }}});  

router.all("/", function(req, res) {
    res.redirect("/home");
  });

  // < -- REACT PAGES --> 
const react_pages = [
    "/dashboard",
    // "/dashboard-orders",
    // "/dashboard-discounts",
    // "/dashboard-products",
    // "/dashboard-history-last-month",
    // "/dashboard-history-ytd",
    // "/dashboard-history-all",
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