import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Order = Schema({
    data:[{
        code: String,
        name: String,
        unit: String,
        count: Number,
        desc: String,
}],
    date: String
});
export default mongoose.model("Order",Order);