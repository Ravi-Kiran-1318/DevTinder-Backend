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
        res.status(500).send("Error creating user: " + error.message);
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
        const user = await User.findByIdAndUpdate(userId, Data, { returnDocument: 'after', runValidators: true });
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
