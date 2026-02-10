const express=require('express');
const app=express();

const {adminAuth, userAuth}=require('./middlewares/auth');

app.use("/admin", adminAuth);

app.use("/user", userAuth);

app.get("/admin/dashboard",(req,res)=>{
    res.send("Welcome to the admin dashboard");
})

app.get("/admin/settings",(req,res)=>{
    res.send("Welcome to the admin settings");
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("Here is all the data");
})

app.get("/user", adminAuth, (req,res)=>{
    //saving data to db
    res.send("User created successfully");
})

app.post("/user/login", userAuth, (req,res)=>{
    //saving data to db
    res.send("User LoggedIn successfully");
})


app.get("/user/:userId",(req,res)=>{
    console.log(req.params)
    res.send({firstname:"Ravi",lastname:"Kiran",age:21});})  
    

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});