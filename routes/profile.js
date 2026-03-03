const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

profileRouter.get("/profile", userAuth, async(req,res)=>{
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

module.exports = profileRouter;