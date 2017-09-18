//Routes for files
//Dependencies
let express = require('express')
let router = express.Router()
let controller = require('./../controllers/mapFile')
let path = require('path')

//Use Static folder for files
router.use('/', express.static(path.resolve('./uploads')))

router.get('/*', (req, res) => {
	var dirName = req.path.split('/')[0]
	var pageName = req.path.split('/')[1]

	controller.mapFileTo(dirName, pageName, (err, content) => {
		if(!err)
			res.sendFile(path.resolve('./uploads/'+dirName+'/'+pageName+'/'+index.html))
		else
			res.send(err)
	})
	//res.sendFile(fileName, {root: './uploads'})
})

module.exports = router
