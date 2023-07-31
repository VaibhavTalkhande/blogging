const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const { createToken } = require('../services/auth.js');

//controller for rendering the signin page
const renderSignin = (req,res) => {
    res.render('signin')
}
//controller for rendering the signup page
const renderSignup = (req,res) => {
    res.render('signup')
}
//controller for creating a new user
const createUser = async (req,res) => {
    const {fullName,email,password} = req.body
    const user = await User.create({fullName,email,password})
    const token = createToken(user)
    res.cookie('token',token) 
    
    return res.redirect('/') 
}
//controller for logout 
const logoutUser = (req,res) => {
    const token = req.cookies.token;
    res.clearCookie('token');
    res.redirect('/user/signin');
}
//controller for signin
const signinUser = async (req,res) => {
    const {email,password} = req.body
    const user = User.findOne({email})
    if(!user){
        return res.redirect('/user/signin')
    }
    if(user.password !== password){
        return res.redirect('/user/signin')
    }
    const token = createToken(user)
    res.cookie('token',token)
    res.redirect('/')
}
module.exports = {
    renderSignin,
    renderSignup,
    createUser,
    logoutUser,
    signinUser
}