const mongoose=require("mongoose");


// Creating structure/Schema for for posting data... from req.body...
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device : {type:String,required:true,enum:["laptop","tablet","mobile"]},
    no_if_comments :{type:Number,required:true},
    userId:{type:String,require:true}
},{
    versionKey:false
});


// Creating modle and collection in our DataBase...
const postmodel=mongoose.model("post",postSchema);


// Exporting model....
module.exports={
    postmodel
}