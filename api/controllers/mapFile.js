let fs = require('fs')
let path = require('path')


var mapFileTo = (dirName, filename, callback) => {
	fs.readdir(path.resolve('uploads')+'/'+dirName+'/'+filename, (err, items) => {
			callback(err, items)
	})
}

module.exports = {mapFileTo}
