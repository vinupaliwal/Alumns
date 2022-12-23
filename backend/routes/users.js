const router = require("express").Router();
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
//update user 
router.put("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id || req.user.isAdmin)
    {
        if(req.body.password)
        {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
       try{
         const user = await UserSchema.findByIdAndUpdate(req.params.id,{$set:req.body});
         res.status(200).json("Account has been updated Successfully");
       } catch(err){
          return res.status(500).json(err);
       }
    }
    else{
        return res.status(403).json("You can update your password only"); 
    }
})
router.get('/',(req,res)=>(res.status(200).send("Hello Programmers this is users !"))); // this is for testing
//delete user 
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await UserSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });
//get a user
// router.get("/",async (req,res)=>{
//    const username =  req.query.username;
//    const userId =  req.query.userId;
//      try{
//         const user = userId ? await UserSchema.findById(userId) : await UserSchema.findOne({username:username});
//         const {password,updatedAt,...others} = user._doc;
//         res.status(200).json(others);
//      }catch(err){
//         res.status(500).json(err);
//      }
// }) 

//get friends
router.get("/friends/:userId",async(req,res)=>{
    const userId = req.params.userId;
    try{
       const user = await UserSchema.findById(userId);
       const friends = await Promise.all(
         user.followings.map((friends)=>{
             return UserSchema.findById(friends)
         })
       );
      let friendList=[];
      friends.map((friend)=>{
         const {_id,username,profilePicture} = friend;
         friendList.push({_id,username,profilePicture});
      })
       res.status(200).json(friendList);
    }catch(err){
       console.log(err);
    }
})


//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await UserSchema.findById(req.params.id);
        const currentUser = await UserSchema.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await UserSchema.findById(req.params.id);
        const currentUser = await UserSchema.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been Unfollowed");
        } else {
          res.status(403).json("you don't follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant Unfollow yourself");
    }
  });

module.exports = router;