import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;
const Product = Schema({
    id: Number,
    code: String,
    name: String,
    unit: String,
    price: Number
});
Product.plugin(passportLocalMongoose);
export default mongoose.model("Product",Product);