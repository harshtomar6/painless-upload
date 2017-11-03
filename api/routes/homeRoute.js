//Route for host/
//Dependencies
let express = require('express')
let router = express.Router()
let multer = require('multer')
let path = require('path')
let fs = require('fs')
let controller = require('./../controllers/mapFile')
let db = require('./../model/db')

//Configure storage of multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var pathToUpload = path.resolve('uploads')+'/'+req.session.username+'/'+req.body.pageName
    if(!fs.existsSync(pathToUpload))
      fs.mkdir(pathToUpload)
    cb(null, './uploads/'+req.session.username+'/'+req.body.pageName)
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

router.get('/about', (req, res, next) => {
  if(req.session.userid){

    db.getUser(req.session.userid, (err, user) => {
      if(err)
        res.render('about.ejs', {loggedIn: false, data: null})
      else
        res.render('about.ejs', {loggedIn: true, data: user})
    })
  }else
    res.render('about.ejs', {loggedIn: false, data: null})
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
      req.session.username = user.username
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
      fs.mkdir(path.resolve('uploads')+'/'+user.username)
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

//router to render explore page
router.get('/explore', (req, res, next) => {
  if(req.session.userid){
    db.getUser(req.session.userid, (err, user) => {
      if(err)
        res.render('explore.ejs', {loggedIn: false, data: null})
      else
        res.render('explore.ejs', {loggedIn: true, data: user});
    })
  }
  else
    res.render('explore.ejs', {loggedIn: false, data: null})
})

//router to handle file uploaded page
router.post('/file-upload', upload.array('file', 10), (req, res, next) => {

  //console.log(req.files)
  var pageData = {
    name: req.body.pageName,
    contents: req.files,
    user: req.session.username
  }

  db.savePageData(pageData, (err, doc) => {
    res.send('Your page is available at <a href="/files/'+req.session.username+'/'+req.body.pageName+'">here</a>')
  })
})

//Export the router
module.exports = router
