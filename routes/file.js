var express = require('express')
var path = require('path')
var fs = require('fs')
var s = require('string')

var router = express.Router();

router.get('/', function(req, res){
	res.sendFile(path.normalize(__dirname+'/../test/test.html'));
});

router.post('/', function(req, res){
	var vP = path.normalize(req.user.userDir);
	var pTC = path.normalize(req.user.userDir+'/'+req.body.path);
	console.log('vp=%s , ptc=%s , chomp=%s , %s',vP,pTC,s(pTC).chompLeft(vP).s,pTC===vP)
	if(fs.existsSync(pTC)){
		if (fs.lstatSync(pTC).isFile()){
			if(s(pTC).chompLeft(vP).s != pTC){
				res.set('Content-Type', 'text/plain');
				res.sendFile(pTC);
			}else{ res.sendStatus(403) }
		}else{ res.sendStatus(404) }
	}else{ res.sendStatus(404) }
});

module.exports = router;