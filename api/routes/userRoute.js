let express = require('express')
let router = require('express').Router()
let path = require('path')
let db = require('./../model/db')

//Use static data to load css of uploaded files
router.use('/', express.static(path.resolve('./src')))

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/*', (req, res) => {
  if(req.session.userid){
    db.getUser(req.session.userid, (err, user) => {
      if(err)
        res.render('user.ejs', {loggedIn: false, data: null})
      else {
        res.render('user.ejs', {err: false, loggedIn: true, data: user})
      }
    })
  }else{
    res.render('login.ejs', {msg: 'You need to log in first', loggedIn: false, data: null})
  }
})

module.exports = router
