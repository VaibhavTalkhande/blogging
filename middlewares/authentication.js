const {verifyToken} = require('../services/auth.js')

const requireAuth = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        console.log('token not found')
        return res.redirect('/user/signin')

    }
    const payload = verifyToken(token)
    if(!payload){
        return res.redirect('/user/signin')
    }
    req.user = payload.user
    next()
}


module.exports = {
    requireAuth
}