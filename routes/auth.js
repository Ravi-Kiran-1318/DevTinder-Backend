const express=require("express");
const authRouter=express.Router();

const { validateSignupData } = require('../utils/validation');
const User=require("../models/user");
const bcrypt = require('bcrypt');

authRouter.post("/signup", async(req,res)=>{
    
    
    try{
        //validation of data
        validateSignupData(req);

        const {firstName,lastName,emailId,password} = req.body;


        //Encrypting the password before saving to database
        const passwordHash = await bcrypt.hash(password, 10);
        req.body.password = passwordHash;

        console.log(passwordHash);

        const user=new User({firstName,lastName,emailId,password:passwordHash});
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user: " + error.message);
    }   
}) 

authRouter.post("/login", async(req,res)=>{
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });

        if (!user) {
            return res.status(404).send("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token,{expires:new Date(Date.now() + 160*3600000), httpOnly:true});  
            res.send("Login successful");

        } 
        else {
            throw new Error("Invalid Credentials");
        }
        } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login: " + error.message);
    }
});


authRouter.post("/logout", (req,res)=>{
    // Set cookie to expire immediately
    res.cookie("token", null,{
        expires:new Date(Date.now())
    }); 
    res.send("Logged out successfully");
});

module.exports=authRouter;