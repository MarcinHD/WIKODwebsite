import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Order = Schema({
    data:[{
        code: String,
        name: String,
        unit: String,
        count: Number,
        description: String,
}],
    deliveryDate: Date,
    date: String
});
export default mongoose.model("Order",Order);
export {Order};