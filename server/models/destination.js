import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Destination = Schema({
    place: String,
    address:{
        city: String,
        street: String,
        number: String,
    }});
export default Destination;