//Route for host/api
//Dependencies
let express = require('express')
let router = express.Router()

//Homepage route
router.get('/', (req, res) => {
  res.send("API is Working")
})

//Export the defined router
module.exports = router
