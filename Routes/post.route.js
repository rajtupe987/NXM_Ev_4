const express = require("express");
const { postmodel } = require("../model/post.model");


const postRoute = express.Router();


postRoute.get("/", async (req, res) => {
    try {
        const posts = await postmodel.find();
        res.send(posts)
    } catch (error) {
        res.send({ "msg": "Error while getting the posts" })
    }
});






postRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await postmodel.findOne({_id:id});
    const userId_in_post = post.userId;
    const userId_making_req = req.body.userId;
    try {
        if (userId_making_req !== userId_in_post) {
            res.send({ "msg": "You are not Authorized" })
        } else {
            const notes = await postmodel.find({ _id: id });
            res.send(notes)
        }

    } catch (error) {
        res.send({ "msg": "error while getting the notes" })
    }
})

postRoute.post("/create", async (req, res) => {

    try {
        const payload = req.body;

        const post = new postmodel(payload);

        await post.save();

        res.send({ "msg": "post created" })
    } catch (error) {
        res.send({ "msg": "Error" });
        console.log(error)
    }
});



postRoute.patch("/update/:id", async (req, res) => {

    const id = req.params.id;
    let payload = req.body;
    let post = await postmodel.findOne({ _id: id });
    const userId_in_post = post.userId;
    const userId_making_req = req.body.userId;

    try {
        if (userId_making_req !== userId_in_post) {
            res.send({ "msg": "You are not Athorized" })
        } else {
            await postmodel.findByIdAndUpdate({ _id: id }, payload);
            res.send({ "msg": "Post has been updated" })
        }
    } catch (error) {
        res.send({ "msg": "Error while updating the posts" })
    }
});

postRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    let post = await postmodel.findOne({ _id: id });
    const userId_in_post = post.userId;
    const userId_making_req = req.body.userId;
    try {
        if(userId_making_req!==userId_in_post){
            res.send(({ "msg": "You are not Athorized" }))
        }else{
            await postmodel.findByIdAndDelete({ _id: id });
            res.send({"msg":"Data has been deleted"})
        }
        
        
    } catch (error) {
        res.send(({ "msg": "Error while deleteing the posts" }))
    }
});


module.exports = {
    postRoute
}