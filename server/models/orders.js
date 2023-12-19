import mongoose from "mongoose";
import Destination from "./destination.js";

const Schema = mongoose.Schema;
const Order = Schema({
    data:[{
        code: String,
        name: String,
        unit: String,
        amount: Number,
        description: String,
}],
    deliveryDate: String,
    deliveryDestination: Destination,
    orderDate: String
});
// export default mongoose.model("Order",Order);
export default Order;