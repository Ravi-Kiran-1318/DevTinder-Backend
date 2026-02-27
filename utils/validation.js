const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Both first name and last name are required");
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address.");
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 6 characters long and contain both letters and numbers.");
    }
}; 

module.exports = { validateSignupData };    








    // if (!firstName || firstName.length < 4) {
    //     throw new Error("First name is required and must be at least 4 characters long.");
    // }

    // if (emailId) {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(emailId)) {
    //         throw new Error("Invalid email address.");
    //     }
    // } else {
    //     throw new Error("Email ID is required.");
    // }

    // if (password) {
    //     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    //     if (!passwordRegex.test(password)) {
    //         throw new Error("Password must be at least 6 characters long and contain both letters and numbers.");
    //     }
    // } else {
    //     throw new Error("Password is required.");
    // }

    // if (age && age < 18) {
    //     throw new Error("Age must be at least 18.");
    // }

    // if (gender && !["Male", "Female", "Other"].includes(gender)) {
    //     throw new Error("Invalid gender. Must be 'Male', 'Female', or 'Other'.");
    // }

    // if (photoUrl) {
    //     try {
    //         new URL(photoUrl);
    //     } catch (_) {
    //         throw new Error("Invalid URL for photo.");
    //     }
    // }

    // if (about && about.length > 500) {
    //     throw new Error("About section must be less than 500 characters.");
    // }

    // return null;