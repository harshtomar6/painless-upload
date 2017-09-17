//Route for host/
//Dependencies
let express = require('express')
let router = express.Router()
let multer = require('multer')
let path = require('path')
let controller = require('./../controllers/mapFile')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname );
  }
});

let upload = multer({storage: storage})

router.use('/', express.static(path.resolve('./src')))

//Root Route for '/'
router.get('/', (req, res, next) => {
  res.render('index.ejs')
})

router.get('/upload', (req, res, next) => {
  res.render('upload.ejs')
})

router.post('/file-upload', upload.single('file'), (req, res, next) => {
	console.log(req.file)
	res.send('Your file is available <a href="/files/'+req.file.originalname.split('.')[0]+'">here</a> ')
})

//Export the router
module.exports = router
