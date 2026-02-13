const express=require('express');
const connectDB=require('./config/database');
const app=express();

const User=require("./models/user");

app.use(express.json());

app.post("/signup", async(req,res)=>{

    console.log("Signup route hit");
    const user=new User(req.body);
    try{
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }   
}) 

//get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail});
        if(users.length===0){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }catch(error){
        console.error("Error fetching user:", error);
        res.status(500).send("Error fetching user");
    }
});

//Feed/get - get all the users in the database
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(error){
        console.error("Error in feed route:", error);   
        res.status(500).send("Error in feed route");
    }
});

app.use("/",(req,res)=>{
    res.send("Welcome to DevTinder");
})

connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});
}).catch((error) => {        
    console.error('Failed to connect to MongoDB:', error);
});
