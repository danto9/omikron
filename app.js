/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.send('Hello World!');
});


var port = process.env.PORT || 3000;
http.listen(3000, function(){
  console.log('Omikron is listening on http://%s:%s', 'localhost', port);
});