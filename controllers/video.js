 const Joi = require('joi');
const mongoose = require("mongoose");
const video = require("../model/videoGallery");

const addVideo = async(req, res)=>{

    
    function validateUser(user)
      {
          const JoiSchema = Joi.object({
            videoTitle: Joi.string().required(),    
            videoCategory: Joi.string().required()
      
          }).options({ abortEarly: false });
        
          return JoiSchema.validate(user)
      }

      const oringnalFileName = req.file.filename;
        const response = validateUser(req.body);

    if(response.error){res.json({"Error":response.error, "Response":false}).status(404);
    }else{

    const videos = new video({
        videoTitle: req.body.videoTitle,
        videoLink: oringnalFileName,     
        videoCategory: req.body.videoCategory
    })

    const saveVideo = await videos.save();

    if(saveVideo){
    res.json({"Message":"Video added sucessfully", "Response":true}).status(202);
    }else{

    res.json({"Message":"Video not added sucessfully", "Response":false}).status(404);
    }

    }


}
///////list
const listVideo = async(req,res)=>{
    const results = await video.find();

    if(results){

        res.json({"Response": true, "message":"We get all images", "Data":results}).status(202);
    }else{

        res.json({"Response": false, "message":"we dont get all images"}).status(404);

    }


}

//list
const deleteVideo = async(req,res)=>{

    const deleteID = await req.params.id;

    // console.log("deleteid", deleteID);

    const deleteVideo = await video.findOne({_id: deleteID});

    //console.log("deleteImg", deleteImg);

    if(deleteVideo){
    const result = await video.deleteOne({_id: deleteID});
 
    if(result){
 
     res.json({"resposne":true, "Message":"Video delete sucessfully"}).status(201);
 
    }else{
     res.json({"resposne":false, "Message":"Video not deleted"}).status(404);
    }
    }else{
     res.json({"resposne":false, "Message":"Video not Found in the database and folder"}).status(404);
    }

}
module.exports = {
    addVideo,listVideo,deleteVideo
  };