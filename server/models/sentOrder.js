import mongoose from "mongoose";
import {UserInfo, Destination} from "./userData.js";
import {Order} from "./orders.js";

const Schema = mongoose.Schema;
const SentOrder = Schema({
    user: UserInfo,
    destination: Destination,
    order: Order
});
export default mongoose.model("SentOrder",SentOrder);