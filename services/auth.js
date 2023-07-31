const jwt = require('jsonwebtoken');

const secret = 'secret';

//create a token

function createToken(user) {

    const payload = {
        user: {
            _id: user._id,
            email: user.email,
            profileImageURL: user.profileImageURL,
            role: user.role,
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

