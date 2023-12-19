import mongoose from "mongoose";
import Destination from "./destination.js";

const Schema = mongoose.Schema;

const UserData = Schema({
    username: String,
    user: {
        firstName: String,
        lastName: String,
        phone: String,
        payment: String,
    }, 
    destinations:[Destination],
    });
export default mongoose.model("UserData",UserData);
export {UserData};