const mongoose=require("mongoose");


// Creating structure/Schema for for posting data... from req.body...
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device : {type:String,required:true},
    no_if_comments :{type:Number,required:true},
    userId:String
});


// Creating modle and collection in our DataBase...
const postmodel=mongoose.model("post",postSchema);


// Exporting model....
module.exports={
    postmodel
}