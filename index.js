/// <reference path="typings/node/node.d.ts"/>
var fs = require('fs')
var https = require('https')

var express = require('express')
var bodyParser = require('body-parser')
var passport = require('passport')
var passportHttp = require('passport-http')

var routes = require('./routes')
var authentication = require('./authentication')

var app = express();
var server = https.createServer({
  cert: fs.readFileSync(__dirname+'/my.crt'),
  key: fs.readFileSync(__dirname+'/my.key')
}, app);

/* Setup Express */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
/* // Setup Express */


/* Setup Passport Session Authentication */
passport.use(new passportHttp.BasicStrategy(authentication.authenticate));

passport.serializeUser(authentication.serializeUser);

passport.deserializeUser(authentication.deserializeUser);
/* // Setup Passport Session Authentication */

app.use('/', passport.authenticate('basic'));
app.use('/', function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.send(403);
  }
});

app.get('/', function(req, res){
  res.send('OK');
});

app.use('/userinfo', routes.userinfo);
app.use('/filetree', routes.filetree);
app.use('/file', routes.file);

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Omikron is listening on https://%s:%s !", "127.0.0.1", port);
});