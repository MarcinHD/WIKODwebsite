import dotenv from "dotenv";
import express from "express";
import body from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import { dirname } from "path"; 
import { fileURLToPath } from "url";
import router from "./routes.js"
import User from "./models/user.js";

// <-- INITIALIZE -->
dotenv.config();
const app = express();
const port = 5000;
const LocalStrategy = passportLocal.Strategy; 
const __dirname = dirname(fileURLToPath(import.meta.url));

// <-- EXPRESS SETTING -->
app.use(express.static("public"));
app.use(body.json());
app.use(body.urlencoded({extended: true}));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// <-- DATABASE SETTING -->
mongoose
    .connect("mongodb://127.0.0.1:27017/Server", {useNewUrlParser: true})
    .then( () => console.log("connected to DB."))
    .catch( err => console.log(err + "\ncant connect to DB ..."));

    // <-- AUTH SETTING -->
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  // < -- EXPRESS SERVER --> 
app.use('/', router);
app.listen(port, () => {
    console.log("Server started on port:" + port);
});

