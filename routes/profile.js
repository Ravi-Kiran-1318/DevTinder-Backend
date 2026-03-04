const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateLoginData } = require('../utils/validation');
const User=require("../models/user");
const bcrypt = require('bcrypt');


profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try{
        const user = req.user;

        if(!user){
            throw new Error("User does not exist");
        }
        res.send(user);

    }
    catch(error){
        console.error("Error fetching profile:", error);
        res.status(500).send("Error fetching profile: " + error.message);
    }

});

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateLoginData(req)){
            throw new Error("Invalid profile data");
        }

        const loggedInUser = req.user;
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();

        res.json({message:`${loggedInUser.firstName}, your Profile updated successfully`,
        data:loggedInUser,});
    }
    catch(error){
        console.error("Error updating profile:", error);
        res.status(500).send("Error updating profile: " + error.message);
    }

});

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
    try{
        const {emailId, currentPassword, newPassword} = req.body;
        const user = req.user;

        if (!user) {
            return res.status(404).send("Invalid Credentials");
        }

        if(!currentPassword || !newPassword){
            throw new Error("Current and new passwords are required");
        }

        const loggedInUser = req.user;

        const isMatch = await loggedInUser.validatePassword(currentPassword);
        if(!isMatch){
            throw new Error("Current password is incorrect");
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        req.body.password = passwordHash;
        console.log(passwordHash);

        loggedInUser.password = passwordHash;
        await loggedInUser.save();

        res.json({message:"Password updated successfully",data:loggedInUser,});
    }
    catch(error){
        console.error("Error updating password:", error);
        res.status(500).send("Error updating password: " + error.message);
    }

});

module.exports = profileRouter;