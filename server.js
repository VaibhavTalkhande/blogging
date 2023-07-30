const express = require('express')
const path = require('path')
const { connectToMongoDB } = require('./connection.js')
const userRoutes = require('./routes/user.js')
const User = require('./models/user.js')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middlewares/authentication.js')
PORT=3000
const app = express()

connectToMongoDB('mongodb+srv://vaibhavtalkhande:6mS4JHqeAjxDwBHQ@cluster0.vlousip.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
})
.catch(err => {
    console.log(err)
})

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(cookieParser())  
app.use(express.urlencoded({ extended: false }))//true vs false true is used for nested objects and false is used for simple objects
app.use(express.json())
app.get('/', requireAuth, (req,res) => {
    res.render('home', {user: req.user})
})
app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}
)
