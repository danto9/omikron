var fs = require('fs')
var https = require('https')

var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var passport = require('passport')
var passportHttp = require('passport-http')

var app = express();
var server = https.createServer({
  cert: fs.readFileSync(__dirname+'/my.crt'),
  key: fs.readFileSync(__dirname+'/my.key')
}, app)

/* Setup Express */
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())
/* // Setup Express */


/* Setup Passport Session Authentication */
passport.use(new passportHttp.BasicStrategy(function(username, password, done){
  if(username === password){
    done(null, { id: username, name: username})
  }else{
    done(null, null)
  }
}))

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  done(null, {id: id, name: id})
})

function ensureAuthentication(req, res, next){
  if(req.isAuthenticated()){
    next()
  }else{
    res.send(403)
  }
}
/* // Setup Passport Session Authentication */

app.use('/', passport.authenticate('basic'))

app.get('/', function(req, res){
  res.send('OK')
})

var port = process.env.PORT || 3000

server.listen(port, function(){
  console.log("App is listening on %s:%s !", "https://127.0.0.1", port)
})