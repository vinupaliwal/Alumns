const router = require("express").Router();
const UserSchema = require('../models/User');
const bcrypt = require("bcrypt");

//Register
router.post("/register",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const newUser = new UserSchema({
            username:req.body.username,
            email:req.body.email, 
            password:hashedPassword,
        })

       const user  = await newUser.save();
        res.status(200).json(user);
    }catch(err){
       console.log(err);
    }
   
})

// LOGIN
router.post("/login",async (req,res)=>{
    try{
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserSchema.findOne({email});
    const isMatch = await bcrypt.compare(password,user.password);
         if(isMatch)
         {
             res.status(200).send(user); 
         }
         else{
             res.send({message:'email or password are incorrect'}); 
         }
    }
    catch(error){
        res.status(400).send({message:'user not registerd yet'});
    }
})

module.exports = router;