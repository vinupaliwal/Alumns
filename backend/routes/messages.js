const router = require("express").Router();
const MessageSchema = require("../models/MessageSchema");

// add message 
router.post("/", async(req,res)=>{
    const newMessage = new MessageSchema(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch(err)
    {
         res.status(500).json(err);
    }
})

// get message
router.get("/:conversationId",async(req,res)=>{
    try{
        const messages  = await MessageSchema.find({conversationId:req.params.conversationId});
        res.status(200).json(messages);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;