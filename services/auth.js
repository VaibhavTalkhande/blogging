const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const secret = 'secret';

//create a token

function createToken(user) {

    const payload = {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic
        },

    };
    const token= jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
}

//verify a token
function verifyToken(token) {
    const payload= jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createToken,
    verifyToken
}

