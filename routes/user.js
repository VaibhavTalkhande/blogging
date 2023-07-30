const {Router}= require('express')

const router = Router()

const {renderSignin,renderSignup,logoutUser,createUser,signinUser} = require('../controllers/user.js')


router.get('/signin',renderSignin)
router.get('/signup',renderSignup)
router.get('/logout',logoutUser)
router.post('/signup',createUser)
router.post('/signin',signinUser)

    


module.exports = router
