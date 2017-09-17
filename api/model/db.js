//Some Database Code
//Dependencies
let Schema = require('./schema')
let mongoose = require('mongoose')

//Models
var User = mongoose.model('user', Schema.userSchema)

var createUser = (user, callback) => {
  User.findOne({email: user.email})
    .exec((err, doc) => {
      if(err)
        return callback("An Error Occured", null)
      if(doc)
        return callback("E-mail already Registered! Please Log in", null)
      else{
        var u = new User()
        u.name = user.name
        u.email = user.email
        u.username = user.email.split('@')[0]
        u.password = u.generateHash(u.password)

        u.save((err, success) => {
          return callback(err, success)
        })
      }
    })
}

var authenticateUser = (user, callback) => {
  User.findOne({ email: user.email })
    .exec((err, doc) => {
      if(err)
        return callback("An Error Occured", null)

      console.log(user.email)
      console.log(doc)

      if(doc){
        if(doc.validatePassword(user.password))
          return callback(null, doc)
        else
          return callback("Oops! You entered the wrong password", null)
      }

      else
        return callback("User not found! Please Sign up first", null)
    })
}

module.exports = { createUser, authenticateUser }
