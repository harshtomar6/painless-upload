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
  res.render('index.ejs')
})

//Router to render login page
router.get('/login', (req, res, next) => {
  res.render('login.ejs')
})

//router to render signup page
router.get('/signup', (req, res, next) => {
  res.render('signup.ejs')
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
  res.render('upload.ejs')
})

//router to handle file uploaded page
router.post('/file-upload', upload.single('file'), (req, res, next) => {
	console.log(req.file)
	res.send('Your file is available <a href="/files/'+req.file.originalname.split('.')[0]+'">here</a> ')
})

//Export the router
module.exports = router
