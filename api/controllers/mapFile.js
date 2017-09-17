let fs = require('fs')
let path = require('path')


var mapFileTo = (filename, callback) => {
	fs.readdir(path.resolve('uploads'), (err, items) => {
		files = []
		var found=false;

		for(var i=0;i<items.length;i++){
			files.push(items[i].split('.')[0])
		}

		for(var i=0;i<files.length;i++){
			if(filename === files[i]){
				found=true;
				return callback(err, items[i])
			}else
				found=false
		}

		if(!found)
			return callback("File Not Found", null)
	})
}

module.exports = {mapFileTo}
