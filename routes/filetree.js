var express = require('express')
var fs = require('fs')
var p = require('path')

var router = express.Router();

router.get('/', function(req, res){
	res.send(dirWalker(req.user.userDir, req.user.userDir))
})

function dirWalker(path, userDir){
	var childs = [];
	fs.readdirSync(path).forEach(function(value, index, array){
		var stat = fs.lstatSync(path+'/'+value);
		if(stat.isDirectory()){
			childs.push({
				path: p.relative(userDir, path+'/'+value),
				type: 'directory', 
				name: value,
				childs:dirWalker(path+'/'+value, userDir)
			});
		}else if(stat.isFile()){
			childs.push({
				path: p.relative(userDir, path+'/'+value),
				type: 'file', 
				name: value
			});
		}
	});
	return childs;
}

module.exports = router;