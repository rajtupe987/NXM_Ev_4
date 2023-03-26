const express = require("express");
const { postmodel } = require("../model/post.model");
//const {authenticate}=require("../middleware/Auth.middleware")


const postRoute = express.Router();

//This will show the posts of logged in users.
postRoute.get("/", async (req, res) => {
    try {
        const {userId}=req.body;
        const {device=["laptop","tablet","mobile"]}=req.query;
    
        const posts=await postmodel.find({$and:[{userId},{$device:{$in:device}}]})
        res.send({"msg":"Your posts",posts})
    } catch (error) {
         res.send({"msg":error.message})
    }
});


postRoute.get("perticular/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const post=await postmodel.findById(id);
        res.send(post)
    } catch (error) {
        res.send({"msg":"Error while getting perticular data"})
    }
})
//To register a new user.
postRoute.post("/create", async (req, res) => {
   
    try {
        const payload = req.body;
        const newpost = new postmodel(payload);
        await newpost.save();
        res.send({ "msg": "post created" ,post:newpost})
    } catch (error) {
        res.send({ "msg": "Error" });
        console.log(error)
    }
});


//This will show the post details that has maximum number of comments for the user who has logged in.
postRoute.get("/top", async (req, res) => {

    try {
        const data = await postmodel.find();
        //console.log(data)
        const maxCommentsPost = data.reduce((prev, current) => {
            return prev.comments > current.comments ? prev : current;
        });
        res.send(maxCommentsPost)
    } catch (error) {
        res.send({ "msg": "Error while getting max comments" })
    }

})



//The logged in user can update his/her posts.
postRoute.patch("/update/:id", async (req, res) => {
    try {
        const payload=req.body;
        const id=req.params.id;
        const updatedpost=await postmodel.findByIdAndUpdate(id,payload);
        res.send({"msg":"Post updated",post:updatedpost})
    } catch (error) {
        res.send({"msg":"Error while updating data"})
    }

});
//The logged in user can delete his/her posts.
postRoute.delete("/delete/:id", async (req, res) => {
    try {
        const payload=req.body;
        const id=req.params.id;
        const deletepost=await postmodel.findByIdAndDelete(id,payload);
        res.send({"msg":"Post deleted",post:deletepost})
    } catch (error) {
        res.send({"msg":"Error while deleting data"})
    }
});


// postRoute.get("/filter",async(req,res)=>{
//    try {
//     const data= await postmodel.find(req.query);
//     res.send(data)
//    } catch (error) { 
//     res.send({"msg":"Error in filter"})
//    }
// })

module.exports = {
    postRoute
}