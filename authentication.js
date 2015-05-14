// function to convert user object to id
exports.serializeUser = function(user, done){
	done(null, user.id)
}

// function to convert user id to user object
exports.deserializeUser = function(id, done){
	done(null, {id: id, name: id})
}

//if authentication is valid then return a user object to done function
//if not return null
exports.authenticate = function(username, password, done){
  if(username === password){
    done(null, { id: username, name: username}) //authentication is valid
  }else{
    done(null, null) // authentication isn't valid
  }
}