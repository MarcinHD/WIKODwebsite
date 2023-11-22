import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Destination = Schema({
    place: String,
    address:{
        city: String,
        street: String,
        number: String,
    }});

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
export {UserData ,Destination};