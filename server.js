const express = require('express')
const path = require('path')
const { connectToMongoDB } = require('./connection.js')
const userRoutes = require('./routes/user.js')
const Blog = require("./models/blog");
const blogRoutes = require('./routes/blog.js')
const User = require('./models/user.js')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/authentication.js')
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
app.use(checkForAuthenticationCookie("token")); 
app.use(express.static(path.resolve(__dirname, 'public'))) 
app.use(express.urlencoded({ extended: false }))//true vs false true is used for nested objects and false is used for simple objects
app.use(express.json())

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
});
app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}
)
 