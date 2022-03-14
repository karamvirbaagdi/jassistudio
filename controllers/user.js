const Joi = require('joi');
const mongoose = require("mongoose");
const users = require("../model/user");
const bcrypt = require("bcrypt");

//User Register conroller
const userRegister = async(req, res)=>{
    function validateUser(user)
    {
        const JoiSchema = Joi.object({
          
            userName: Joi.string().required(),
            password:Joi.required(),                  
            email: Joi.string().email().min(5).max(50).optional(),
            password:Joi.string().required(),
            phoneNumber: Joi.number().required()           
           
        }).options({ abortEarly: false });
      
        return JoiSchema.validate(user)
    }
    const response = validateUser(req.body);
console.log("response", response, response.error);
if(response.error)
{  
    console.log("message", response.error.details);
    res.json({"response":"false","message":response.error.details}).status(400);
}
else
{
  
const salt = await bcrypt.genSalt(10);
const newpassword = await bcrypt.hash(req.body.password, salt);
const usersRe = new users({
    userName:req.body.userName,
    password:newpassword,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber
});

    const usersSave = await usersRe.save();
     if(usersSave){
        res.json({"response":"sucess", "Message" : "User added sucessfully"}).status(201);
     }else{ res.json({"response":"false", "Message" : "User not added sucessfully"}).status(401) }
    
}
  
}///end user Register

//User Login Controller 

const userLogin =  async(req, res)=>{

    function validateUser(user)
    {
        const JoiSchema = Joi.object({ email: Joi.string().required(), password:Joi.string().required()      
     
        }).options({ abortEarly: false });
      
        return JoiSchema.validate(user)
    }
    const response = validateUser(req.body);

    if(response.error){

        res.status(404).json({"Error":response.error});
    
    }else{
    
        const findUserByEmail = await users.findOne({email:req.body.email});
    
        console.log("findUserByEmail", findUserByEmail);
    
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

}////end user Login

////user List Controller
const userList =  async(req, res)=>{

    const results = await users.find();

    if(results){

        res.json({"Response": true, "message":"We get all users", "Data":results}).status(202);
    }else{

        res.json({"Response": false, "message":"we dont get all users"}).status(404);

    }
}


module.exports = {
    userRegister,
    userLogin,
    userList
  };