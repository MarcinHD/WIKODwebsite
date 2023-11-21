import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserInfo = Schema({
    firstName: String,
    lastName: String,
    phone: String,
    payment: String,
});
const Destination = Schema({
        place: String,
        address:{
            city: String,
            street: String,
            number: String,
        }});
const UserData = Schema({
    username: String,
    user: UserInfo, 
    destination:[Destination],
});
export default mongoose.model("UserData",UserData);
export {UserData ,Destination, UserInfo};