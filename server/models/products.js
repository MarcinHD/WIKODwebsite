import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Product = Schema({
    id: Number,
    code: String,
    name: String,
    unit: String,
    price: Number
});
export default mongoose.model("Product",Product);