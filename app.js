const express=require('express');
const connectDB=require('./config/database');
const app=express();
const User=require("./models/user");
const { validateSignupData } = require('./utils/validation');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userAuth } = require('./middlewares/auth');


app.use(express.json());
app.use(cookieParser());
app.post("/signup", async(req,res)=>{
    
    
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

app.post("/login", async(req,res)=>{
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });

        if (!user) {
            return res.status(404).send("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            //Create a JWT Token
            const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key",{expiresIn:"1h"});

            //Add the token to the cookie and send the response back to the client

            res.cookie("token", token,{expires:new Date(Date.now() + 16 0*3600000), httpOnly:true});  
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


app.get("/profile", userAuth, async(req,res)=>{
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

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
    const user=req.user;
    console.log("Sending a connection request");

    res.send(user.firstName + " sent the connection request");
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

//getting user by id
app.get("/user/:id",async(req,res)=>{
    const userId=req.params.id;
    try{
        const users=await User.findById(userId);
        if(!users){
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

//deleting a user by id
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {

        // const user = await User.findByIdAndDelete({_id:userId});

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }
    } 
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
});

//updating a user by id
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const Data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, Data, { returnDocument: 'after' });
        // console.log("Updated user:", user);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("User updated successfully");
        }
    } catch (error) {
        console.error("Error updating user:", error);   
        res.status(500).send("Error updating user: " + error.message);
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
