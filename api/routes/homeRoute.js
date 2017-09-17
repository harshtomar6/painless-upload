//Route for host/
//Dependencies
let express = require('express')
let router = express.Router()
let multer = require('multer')
let path = require('path')
let controller = require('./../controllers/mapFile')
let db = require('./../model/db')

//Configure storage of multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  //Taking the filename as original
  filename: function (req, file, cb) {
    cb(null,  file.originalname );
  }
});

//initialize Multer
let upload = multer({storage: storage})

//Use static data to load css of uploaded files
router.use('/', express.static(path.resolve('./src')))

//Root Route for '/'
router.get('/', (req, res, next) => {
  if(req.session.userid){

    db.getUser(req.session.userid, (err, user) => {
      if(err)
        res.render('index.ejs', {loggedIn: false, data: null})
      else
        res.render('index.ejs', {loggedIn: true, data: user})
    })
  }else
    res.render('index.ejs', {loggedIn: false, data: null})

})

//Router to render login page
router.get('/login', (req, res, next) => {
  res.render('login.ejs', {msg: false, loggedIn: false, data: null})
})

//router to handle post request for user login
router.post('/login', (req, res, next) => {
  db.authenticateUser(req.body, (err, user) => {
    if(err)
      res.send(err)
    else {
      req.session.userid = user._id
      res.send(user)
    }
  })
})

//router to render signup page
router.get('/signup', (req, res, next) => {
  res.render('signup.ejs', {loggedIn: false, data: null})
})

//router to handle post request for user signup
router.post('/signup', (req, res, next) => {
  db.createUser(req.body, (err, user) => {
    if(err)
      res.send(err)
    else {
      res.send("Account Created Successfully")
    }
  })
})

//router to render upload page
router.get('/upload', (req, res, next) => {
  if(req.session.userid){
    db.getUser(req.session.userid, (err, user) => {
      if(err)
        res.render('upload.ejs', {loggedIn: false, data: null})
      else
        res.render('upload.ejs', {loggedIn: true, data: user})
    })
  }
  else {
    res.render('login.ejs', {msg: 'You need to log in first', loggedIn:false, data:null})
  }
})

//router to handle file uploaded page
router.post('/file-upload', upload.single('file'), (req, res, next) => {
	console.log(req.file)
	res.send('Your file is available <a href="/files/'+req.file.originalname.split('.')[0]+'">here</a> ')
})

//Export the router
module.exports = router
