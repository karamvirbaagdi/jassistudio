const express = require("express");
const mongoose = require("mongoose");
const users = require("../../model/user");
const Joi = require('joi');
const bcrypt = require("bcrypt");

const router = express.Router();

function validateUser(user)
{
    const JoiSchema = Joi.object({
      
        userName: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),
        password:Joi.required(),        
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .optional(),
        password:Joi.string().required(),
                 
        phoneNumber: Joi.number().required()
                         
       
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}


router.post("/api/user/register", async(req, res)=>{

//res.send("we are at register page");

//console.log("request", req);
const response = validateUser(req.body);
console.log("response", response, response.error)
if(response.error)
{  
 
    console.log("message", response.error.details);
        res.json({"response":"false","message":response.error.details}).status(400);

}
else
{
  
const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(req.body.password, salt);

const user = new users({
    userName:req.body.userName,
    password:newpassword,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber
});


  
    
    const usersSave = await user.save();
     if(usersSave){
    
        res.json({"response":"sucess", "Message" : "User added sucessfully"}).status(201);
     }else{

        res.json({"response":"false", "Message" : "User not added sucessfully"}).status(401);
     }
    
}


});

module.exports= router;