import mongoose from "mongoose";
import {UserData} from "./userData.js";
import {Order} from "./orders.js";

const Schema = mongoose.Schema;
const SentOrder = Schema({
    user:{
        firstName: String,
        lastName: String,
        phone: String,
        payment: String,
    },
    order: Order
});
export default mongoose.model("SentOrder",SentOrder);