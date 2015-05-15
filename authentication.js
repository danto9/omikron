var crypto = require('crypto');
var users = require('./users');

// function to convert user object to id
exports.serializeUser = function(user, done){
	done(null, user.id);
};

// function to convert user id to user object
exports.deserializeUser = function(id, done){
	users.forEach(function (value, index, array) {
    if(id === value.id){
      done(null, value);
    }
  });
  done(null, null);
};

//if authentication is valid then return a user object to done function
//if not return null
exports.authenticate = function(username, password, done){
  var isDone = false;
  users.forEach(function(value, index, array){
    if(value.name === username){
      if(value.password === crypto.pbkdf2Sync(password, 'salt', 4096, 512, 'sha256').toString('hex')){
        done(null, value);
        isDone = true;
      }
    }
  });
  if(!isDone)
    done(null, null);
};