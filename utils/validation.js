const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Both first name and last name are required");
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address.");
    }

    // else if (!validator.isStrongPassword(password)) {
    //     throw new Error("Password must be at least 6 characters long and contain both letters and numbers.");
    // }
}; 


const validateLoginData = (req) => {
    const allowedFields = [
        'firstName',
        'lastName',
        'emailId',
        'age',
        'gender',
        'skills',
        'about',
        'photoUrl'
        ];

    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));

    return isEditAllowed;
    
}

module.exports = { validateSignupData, validateLoginData };    

