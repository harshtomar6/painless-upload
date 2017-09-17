//Some Database Code
//Dependencies
let Schema = require('./schema')
let mongoose = require('mongoose')

//Models
var User = mongoose.model('user', Schema.userSchema)

var createUser = (user, callback) => {
  User.findOne({email: user.email})
    .exec((err, doc) => {
      if(doc)
        return callback("E-mail already Registered! Please Log in", null)
      else{
        var u = new User()
        u.name = user.name
        u.email = user.email
        u.password = u.generateHash(u.password)

        u.save((err, success) => {
          return callback(err, success)
        })
      }
    })
}

module.exports = {createUser}
