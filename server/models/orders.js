import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;
const OrderPosition = Schema({
        code: String,
        name: String,
        unit: String,
        count: Number,
        desc: String,
});
const Order = Schema({
    data:[OrderPosition],
    date: String
});
Order.plugin(passportLocalMongoose);
export default mongoose.model("Order",Order);