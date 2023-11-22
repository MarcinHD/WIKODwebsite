import mongoose from "mongoose";
import {UserData} from "./userData.js";
import {Order} from "./orders.js";

const Schema = mongoose.Schema;
const SentOrder = Schema({
    user: UserData,
    order: Order
});
export default mongoose.model("SentOrder",SentOrder);