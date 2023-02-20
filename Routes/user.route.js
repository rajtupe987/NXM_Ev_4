const express=require("express");
const {usermodel}=require("../model/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userRoute=express.Router();


userRoute.post("/register",async(req,res)=>{

   const {name,email,age,gender,city,pass} = req.body;
  
   try {
    
    bcrypt.hash(pass,5,async(err,hash)=>{

        if(err){
            res.send(({"msg":"Sonmething went wrong"}))
        }else{
           const app= new usermodel({name,email,age,gender,city,pass:hash});
           await app.save();
            res.send(({"mag":"New user created"}))
        }
    })
   } catch (error) {
    res.send(({"msg":"Sonmething went wrong"}))
   }

   
});


userRoute.post("/login",async(req,res)=>{
    
    try {
        const {email,pass}=req.body;
        let user=await usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user[0]._id},"raj");
                    res.send({"msg":"User Logged in","token":token});
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            })
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        res.send({"msg":"Error while login"})
    }
});

userRoute.patch("/update/:id",async(req,res)=>{
    
  const userid=req.params.id;
  const payload=req.body;

    try {
        await usermodel.findByIdAndUpdate({_id:userid},payload);
        res.send({"msg":"User has been updated"})
    } catch (error) {
        res.send({"msg":"Error while updating the user "})
    }
});




userRoute.delete("/delete/:id",async(req,res)=>{
    
    try {
        const userid=req.params.id;
        await usermodel.findByIdAndDelete({_id:userid});
        res.send({"msg":"User has been deleted"})
    } catch (error) {
        res.send({"msg":"Error while deleting the user"})
    }
});

module.exports={
    userRoute
}