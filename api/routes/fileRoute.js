//Routes for files
//Dependencies
let express = require('express')
let router = express.Router()
let controller = require('./../controllers/mapFile')
let path = require('path')

//Use Static folder for files
router.use('/', express.static(path.resolve('./uploads')))

router.get('/*', (req, res) => {
	var fileName = req.path.split('/')[1]

	controller.mapFileTo(fileName, (err, content) => {
		if(!err)
			res.sendFile(path.resolve('./uploads/'+content))
		else
			res.send(err)
	})
	//res.sendFile(fileName, {root: './uploads'})
})

module.exports = router
