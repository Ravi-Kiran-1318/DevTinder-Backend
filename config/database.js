const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://kuttimaa:16Ow8uzOqaeZcJmY@namaste.gyrjtj5.mongodb.net/devTinder'
    );
};

module.exports = connectDB;