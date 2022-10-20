const router = require("express").Router();
const PostSchema = require("../models/PostSchema");
const UserSchema = require("../models/User");


//create a post 
router.post("/",async(req,res)=>{
    const newPost = new PostSchema(req.body);
    try{
        savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);
    }
})
//update a post 
router.put("/:id",async(req,res)=>{
    try{
    const post = await PostSchema.findById(req.params.id);
    if(post.userId===req.body.userId){
         await post.updateOne({$set:req.body});
         res.status(200).json("Post has been updated");
    }
    else{
        res.status(403).json("you can only update your post");
    }
  }catch(err){
    res.status(500).json(err);
  }
})
//delete a post 
router.delete("/:id",async(req,res)=>{
    try{
    const post = await PostSchema.findById(req.params.id);
    if(post.userId===req.body.userId){
         await post.deleteOne({$set:req.body});
         res.status(200).json("Post has been deleted");
    }
    else{
        res.status(403).json("you can only delete your post");
    }
  }catch(err){
    res.status(500).json(err);
  }
})

//like a post 
router.put("/:id/like",async(req,res)=>{
    try{
        const post = await PostSchema.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({$push:{likes:req.body.userId}});
           res.status(200).json("post has been liked");
        }else{
           await post.updateOne({$pull:{likes:req.body.userId}});
           res.status(200).json("post has been Unliked");
        }
    }catch(err){
       res.status(500).json("post has been unliked");
    }
})

//get a post 
router.get("/:id",async(req,res)=>{
    try{
    const post = await PostSchema.findById(req.params.id);
    res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})
//get all timeline or following user posts
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await UserSchema.findById(req.params.userId);
      const userPosts = await PostSchema.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return PostSchema.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get all users posts
  router.get("/profile/:username", async (req, res) => {
    try {
      const user = await UserSchema.findOne({ username: req.params.username });
      const posts = await PostSchema.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;