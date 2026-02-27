const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minlength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be at least 6 characters long");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male", "Female", "Other"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl: {
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL for photo");
            }
        }
    },
    about: {
        type: String,
        maxlength: 500,
        default:"Hey! This is my default about section.",
    },
    skills:{
        type: [String],
        default:[],
    },
    location: {
        type: String,
        default:"Unknown",
    }
},{timestamps:true}); 

const User = mongoose.model('User', userSchema);

module.exports = User;