//Lets start painlessupload.com
//Core Dependencies
let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let passport = require('passport')
let session = require('express-session')
let path = require('path')
let config = require('./config/config')
let apiRoute = require('./api/routes/apiRoute')
let homeRoute = require('./api/routes/homeRoute')
let fileRoute = require('./api/routes/fileRoute')
let userRoute = require('./api/routes/userRoute')

//Listening on port
const port = process.env.PORT || 3000

//connect to Databse
mongoose.connect(config.DATABASE_URI)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./src/views'))

//Use cookie-parser to validate session
app.use(cookieParser())

//Use bodyParser to parse POST requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//required for passport
app.use(session({ secret: config.SESSION_SECRET, resave: true, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

//Use Home Route
app.use('/', homeRoute)
//Use API Route
app.use('/api', apiRoute)
//Use File Route
app.use('/files', fileRoute)
//use user route
app.use('/user', userRoute)

//Listen for http requests at specified port
app.listen(port, () => {
  console.log("Server is LIVE at port "+port)
})
