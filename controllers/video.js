 const Joi = require('joi');
const mongoose = require("mongoose");
const video = require("../model/videoGallery");

const addVideo = async(req,res)=>{

    console.log("dssfsf", req);

  


}
//list
const listVideo = async(req,res)=>{

    res.status(404).json({"response": false, "Message" : "list the video"});

}

//list
const deleteVideo = async(req,res)=>{

    res.status(404).json({"response": false, "Message" : "delete the video"});

}
module.exports = {
    addVideo,listVideo,deleteVideo
  };