import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;
const User = Schema({
    username: String,
    password: String
});
User.plugin(passportLocalMongoose);
export default mongoose.model("User",User);