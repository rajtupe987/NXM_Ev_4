const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
     name : String,
     email : String,
     gender:String,
     city:String,
     age : Number,
      pass : String
     
    
},{
    versionKey:false
});


const usermodel=mongoose.model("user",userSchema);

module.exports={
    usermodel
}