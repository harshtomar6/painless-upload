//Some Database Code
//Dependencies
let Schema = require('./schema')
let mongoose = require('mongoose')

//Models
var User = mongoose.model('user', Schema.userSchema)

//To add new user
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
        u.password = u.generateHash(user.password)

        u.save((err, success) => {
          return callback(err, success)
        })
      }
    })
}

//To authenticate user
var authenticateUser = (user, callback) => {
  User.findOne({ email: user.email })
    .exec((err, doc) => {
      if(err)
        return callback("An Error Occured", null)

      if(doc){
        var valid = doc.validatePassword(user.password, doc.password)
        if(valid)
          return callback(null, doc)
        else
          return callback("Oops! You entered the wrong password", null)
      }

      else
        return callback("User not found! Please Sign up first", null)
    })
}

//Get user data
var getUser = (id, callback) => {
  User.findOne({ _id: id })
    .exec((err, user) => {
      callback(err, user)
    })
}

module.exports = { createUser, authenticateUser, getUser }
