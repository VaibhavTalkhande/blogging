const mongoose = require('mongoose');
const {createHmac,randomBytes} = require('crypto');
const { match } = require('assert');
const { createToken } = require('../services/auth');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, "Name must be at least 2 characters long"]
    },
    salt : {
        type: String,
        minlength: [2, "Salt must be at least 2 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"

        }
    },
    profilePic: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },

    role: {
        type: String,
        enum: ["admin", "user"],//enum is a validator that checks if the value is one of the given strings
        default: "user"
    },
}, { timestamps: true });

UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = randomBytes(16).toString();
    const HashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = HashedPassword;
    next();
}) 
UserSchema.static("matchPasswordcreateToken", async function(email,password){
    console.log("matchPassword")
    const user = await this.findOne({email});
    console.log(user)
    if(!user) return false;
    const salt = user.salt;
    const HashedPassword = user.password;
    const userProvidedPassword =  createHmac('sha256', salt).update(password).digest('hex');
    if(userProvidedPassword === HashedPassword){
       const token= createToken(user);
       return token;
    }
    else{throw new Error("Invalid password")};

})


const User = mongoose.model("User", UserSchema);

module.exports = User;
