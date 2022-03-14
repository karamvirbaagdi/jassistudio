const express = require("express");
const image = require("../../model/imagesGallery");
const router = express.Router();

router.post("/api/image/delete/(:id)", async(req, res)=>{

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
    res.json({"resposne":false, "Message":"Image not Found."}).status(404);
   }

});

module.exports = router;