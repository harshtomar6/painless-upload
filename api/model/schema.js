//Different Schemas
//Dependencies
let mongoose = require('mongoose')
let Schema = mongoose.Schema

//pages Schema
let pageSchema = new Schema({
  fileName: String,
  fileUrl: String,
  user: String
})

//Model this Schema and export this
module.exports = mongoose.model('Page', pageSchema)
