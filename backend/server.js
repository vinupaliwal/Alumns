const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const conversationRoutes = require('./routes/conversation');
const messagesRoutes = require('./routes/messages');

dotenv.config();
PORT = 8081;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
    console.log("MongoDb Database is connected");
})

app.use("/images",express.static(path.join(__dirname,"public/images")));
//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/',(req,res)=>(res.status(200).send("Hello Programmers How you doing !")));
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
       cb(null,req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
       return res.status(200).json("File uploaded successfully");
    }catch(err){
       console.log(err);
    }
})

app.use("/api/users",usersRoutes); 
app.use("/api/auth",authRoutes);
app.use("/api/posts",postsRoutes); 
app.use("/api/conversations",conversationRoutes); 
app.use("/api/messages",messagesRoutes); 


app.listen(8000,()=>{
    console.log(`Server is running on http://localhost:8000`);
});


// JJKAuSdSCiTWI8zx