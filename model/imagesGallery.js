const mongoose = require("mongoose");
const dbConn = require("../db/dbConnect");

const Image = new mongoose.Schema({

    ImageTitle:{type:String, required:true},
    ImageLink:{type:String, required:true},
    category:{type:String, required:true},
    date:{type:String, default:Date}
});

const Images = new mongoose.model("Image", Image);
module.exports = Images;
