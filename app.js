const express=require('express');
const app=express();


app.get("/getUserDetails",(req,res)=>{
    try{
        //Logic to get user details and get user data
        throw new Error("Failed to fetch user details");
        res.send("User details fetched successfully");
    }catch(error){
        res.status(500).json({message:error.message});
    }  
})

app.use("/", (err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
})

    

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});