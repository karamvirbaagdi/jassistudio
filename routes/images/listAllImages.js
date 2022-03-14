const express = require("express");
const image = require("../../model/imagesGallery");
const router = express.Router();

router.get("/api/image/list", async(req, res)=>{

    const results = await image.find();

    if(results){

        res.json({"Response": true, "message":"We get all images", "Data":results}).status(202);
    }else{

        res.json({"Response": false, "message":"we dont get all images"}).status(404);

    }
});


module.exports = router;