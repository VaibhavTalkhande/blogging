const mongoose = require('mongoose');
const {createHmac,randomBytes} = require('crypto');
const { createToken } = require('../services/auth');


const UserSchema = new mongoose.Schema(
    {
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        salt: {
          type: String,
        },
        password: {
          type: String,
          required: true,
        },
        profileImageURL: {
          type: String,
          default: "/images/default.png",
        },
        role: {
          type: String,
          enum: ["USER", "ADMIN"],
          default: "USER",
        },
      },
      { timestamps: true }
    );

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
      const user = await this.findOne({ email });
      if (!user) throw new Error("User not found!");
  
      const salt = user.salt;
      const hashedPassword = user.password;
  
      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
  
      if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");
  
      const token = createToken(user);
      return token;

})


const User = mongoose.model("user", UserSchema);

module.exports = User;
