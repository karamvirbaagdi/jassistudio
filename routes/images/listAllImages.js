const express = require("express");
const image = require("../../model/imagesGallery");
const router = express.Router();

router.get("/api/image/list", async(req, res)=>{

    res.send("we are at image lisst page ")

});


module.exports = router;