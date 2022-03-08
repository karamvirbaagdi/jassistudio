const express = require("express");
const images = require("../../model/imagesGallery");
const router = express.Router();
const Joi = require('joi');
const multer = require("multer");
const bcrypt = require("bcrypt");

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../../uploads/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

function validateUser(user)
{
    const JoiSchema = Joi.object({
      
      ImageTitle: Joi.string().required(),
      ImageLink:Joi.string().required(),     
      category: Joi.string().required()

    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}
const upload = multer({ storage : storage});

router.post("/api/image/add", async(req, res, next)=>{

  const response = validateUser(req.body);
  //console.log("errorMessage", response.details);
  //res.json({"response" : response.error});
if(response.error){
  res.json({"Error":response.error, "Response":false}).status(404);
}else{

  const image = new images({
    ImageTitle: req.body.ImageTitle,
      ImageLink: req.body.ImageLink,     
      category: req.body.category
  })

  const saveImage = await image.save();
if(saveImage){
  res.json({"Message":"Image added sucessfully", "Response":true}).status(404);
}else{

  res.json({"Message":"Imagenot added sucessfully", "Response":false}).status(202);
}
}


});


module.exports = router;

