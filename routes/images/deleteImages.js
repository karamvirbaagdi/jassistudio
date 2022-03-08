const express = require("express");
const image = require("../../model/imagesGallery");
const router = express.Router();

router.post("/api/image/delete", async(req, res)=>{

    res.send("we are at image delete page ")

});

module.exports = router;