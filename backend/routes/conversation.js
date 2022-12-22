const router = require("express").Router();
const ConversationSchema = require("../models/ConversationSchema");

// new conversation 
router.post("/", async(req,res)=>{
    const newConversation = new ConversationSchema({
        members:[req.body.senderId,req.body.receiverId],
    });
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch(err)
    {
         res.status(500).json(err);
    }
})

// get conversation
router.get("/:userId",async(req,res)=>{
    try{
        const conversation  = await ConversationSchema.find({
            members:{ $in: [req.params.userId] }
        })
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await ConversationSchema.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;