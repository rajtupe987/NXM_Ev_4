const express = require("express");
const { usermodel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRoute = express.Router();


userRoute.post("/register", async (req, res) => {
  try {
    const payload=req.body;
    const user=await usermodel.findOne({email:payload.email});

    if(user){
        req.send({"msg":"User is already exist"})
    }else{
        //encrypting the password...
        const hashedpass=await bcrypt.hashSync(payload.pass,7);
        payload.pass=hashedpass;

        const newUser=new usermodel(payload);
        await newUser.save();
        return res.json({"msg":"User Registered",user:newUser})
    }
  } catch (error) {
     res.send({"msg":error.message})
  }
});


userRoute.post("/login", async (req, res) => {
    try {
        const payload=req.body;
        const user=await usermodel.findOne({email:payload.email});
        if(!user){
           return res.send({"msg":"Please SignUp first"})
        }

        const ispassCorrect=await bcrypt.compare(
            payload.pass,
            user.pass
        )

        if(ispassCorrect){
           let token= await jwt.sign({email:user.email,userId:user._id},process.env.key)
        
           res.send({"msg":"Login Succesfull",token})
        
        }else{
            res.send({"msg":"Invalid Credentials"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
});





userRoute.patch("/update/:id", async (req, res) => {

    const userid = req.params.id;
    const payload = req.body;

    try {
        await usermodel.findByIdAndUpdate({ _id: userid }, payload);
        res.send({ "msg": "User has been updated" })
    } catch (error) {
        res.send({ "msg": "Error while updating the user " })
    }
});




userRoute.delete("/delete/:id", async (req, res) => {

    try {
        const userid = req.params.id;
        await usermodel.findByIdAndDelete({ _id: userid });
        res.send({ "msg": "User has been deleted" })
    } catch (error) {
        res.send({ "msg": "Error while deleting the user" })
    }
});

module.exports = {
    userRoute
}