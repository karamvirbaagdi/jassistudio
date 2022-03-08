const express = require("express");
const user = require("../../model/user");
const router = express.Router();
const Joi = require('joi');
const bcrypt = require("bcrypt");

function validateUser(user)
{
    const JoiSchema = Joi.object({
      
        userName: Joi.string().required(),
        password:Joi.string().required(),        
 
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}
router.post("/api/user/login", async(req, res)=>{


console.log("hjghjghjg");
const response = validateUser(req.body);

//here check user add filed is valid
if(response.error){

    res.status(404).json({"Error":response.error});

}else{

    const findUserByEmail = await user.findOne({email:req.body.userName});

    //console.log("findUserByEmail", findUserByEmail);

    if(findUserByEmail){

        const match = await bcrypt.compare(req.body.password, findUserByEmail.password);

        if(match) {

            res.status(202).json({"response": true, "Message" : "User login sucessfully"});
            //login
        }else{

            res.status(404).json({"response": false, "Message" : "password does not match"});
        }

    }else{
        res.status(404).json({"response": false, "Message" : "Please check your Email Addresss again."});
    }
 
}


res.json({"resopnse":response});

})


module.exports = router;

