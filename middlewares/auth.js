const jwt=require('jsonwebtoken');  
const User=require("../models/user");

const userAuth=async (req, res, next) => {

    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Invalid token");
        }

        const decodeObj= await jwt.verify(token,"your_jwt_secret_key");

        const userId=decodeObj.userId;

        const user= await User.findById(userId);

        if(!user){
            throw new Error("User does not exist");
        }

        req.user=user;
        next();
    }
    catch(error){
        res.status(401).send("Authentication failed: " + error.message);
    }
}

module.exports={userAuth};