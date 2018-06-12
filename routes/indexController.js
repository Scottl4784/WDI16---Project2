const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Find Users
router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.render(
        'index',
        { users }
      )
    }).catch((error) => {
      console.log(error)
    })
})

// New
router.get('/new', (req, res) => {
  const userId = req.params.userId
  res.render('users/new', { userId })
})

// Create
router.post('/', (req, res) => {
  const newUser = req.body
    User.create(newUser) 
    .then(() => {
      res.redirect('/users')
    })
    .catch((err) => {
      console.log(err)
    })
})



module.exports = router