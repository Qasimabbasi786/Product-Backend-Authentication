const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required!"],
        trim: true,
    },
    email:{
        type: String,
        lowercase: true,
        required: [true, "Email is required!"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type: String,
        required: [true, "Password is required!"],
        minLength: [6, "Password must be at least 6 characters long!"],
    },
});



module.exports = mongoose.model("User", userSchema);