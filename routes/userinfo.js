var express = require('express')
var util = require('util')

var router = express.Router()

router.get('/', function(req, res){
	res.send(req.user)
})

module.exports = router