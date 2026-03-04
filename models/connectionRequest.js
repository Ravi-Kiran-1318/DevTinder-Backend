const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    status:{
        type:String,
        enum:["ignore", "interested", "accepted", "rejected"],
        default:"pending",
    }
},
{
    timestamps:true,
}
);

const ConnectionRequest=mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports=ConnectionRequest;