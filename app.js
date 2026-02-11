const express=require('express');
const connectDB=require('./config/database');
const app=express();

const User=require("./models/user")

app.post("/signup", async(req,res)=>{

    console.log("Signup route hit");
    const user=new User({
        firstName:"Aditya",
        lastName:"Batchu",
        email:"adityabatchu@gmail.com",
        password:"123456",
        age:22,
        gender:"Male"
    })
    try{
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }   
}) 

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
