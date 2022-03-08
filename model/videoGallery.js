const mongoose = require("mongoose");
const dbConn = require("../db/dbConnect");

const Videos = new.mongoose.Schema({

    videoTitle:{type:String, required:true},
    videoLink:{type:String, required:true},
    date:{type:String, default:Date}
});



const Videos = new mongoose.model("Videos", Videos);
module.exports = Videos;
