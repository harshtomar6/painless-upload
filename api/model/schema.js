//Different Schemas
//Dependencies
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt-nodejs')

//pages Schema
let pageSchema = new Schema({
  fileName: String,
  fileUrl: String,
  user: String
})

//User Schema
let userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String
})

//User schema functions
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

//Model this Schema and export this
module.exports = {
  userSchema,
  pageSchema
}
