const mongoose = require("mongoose");
const dbConn = require("../db/dbConnect");

const user = new mongoose.Schema({
    userName:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    date:{type:String, default:Date}
});


const users = new mongoose.model("user", user);
module.exports = users;
