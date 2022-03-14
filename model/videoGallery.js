const mongoose = require("mongoose");
const dbConn = require("../db/dbConnect");

const Video = new mongoose.Schema({

    videoTitle:{type:String, required:true},
    videoLink:{type:String, optional:true},
    videoCategory:{type:String, required:true},
    date:{type:String, default:Date}
});

const Videos = new mongoose.model("Videos", Video);
module.exports = Videos;