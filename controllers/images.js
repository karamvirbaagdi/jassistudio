const image = require("../model/imagesGallery"); 
const Joi = require('joi');


/********ForDeleteImage********************/

 const deleteImage =  async(req, res)=>{

    const deleteID = await req.params.id;
   // console.log("deleteid", deleteID);
   const deleteImg = await image.findOne({_id: deleteID});
   console.log("deleteImg", deleteImg);
   if(deleteImg){
   const result = await image.deleteOne({_id: deleteID});

   if(result){

    res.json({"resposne":true, "Message":"Image delete sucessfully"}).status(201);

   }else{
    res.json({"resposne":false, "Message":"Image not deleted"}).status(404);
   }
   }else{
    res.json({"resposne":false, "Message":"Image not Found in the database and folder"}).status(404);
   }

}

/******************forAddImage********************/

const addImage =  async(req, res)=>{

      
      function validateUser(user)
      {
          const JoiSchema = Joi.object({
            
            ImageTitle: Joi.string().required(),    
            category: Joi.string().required()
      
          }).options({ abortEarly: false });
        
          return JoiSchema.validate(user)
      }
    
        const oringnalFileName = req.file.filename;
        const response = validateUser(req.body);

    if(response.error){res.json({"Error":response.error, "Response":false}).status(404);
    }else{

    const images = new image({
        ImageTitle: req.body.ImageTitle,
        ImageLink: oringnalFileName,     
        category: req.body.category
    })

    const saveImage = await images.save();

    if(saveImage){
    res.json({"Message":"Image added sucessfully", "Response":true}).status(404);
    }else{

    res.json({"Message":"Imagenot added sucessfully", "Response":false}).status(202);
    }

    }


}//Add image controller

/*******list Imges */

const listImage = async(req, res)=>{

    const results = await image.find();

    if(results){

        res.json({"Response": true, "message":"We get all images", "Data":results}).status(202);
    }else{

        res.json({"Response": false, "message":"we dont get all images"}).status(404);

    }
}


module.exports = {
    deleteImage,
    addImage,
    listImage
  };