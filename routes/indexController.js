const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.render(
        'index',
        { users }
      )
    }).catch((error) => {
      console.log('Error retrieving users from database!');
      console.log(error);
    })
})

router.get('/new', (req, res) => {
  const userId = req.params.userId
  res.render('users/new', { userId })
})

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

router.post('/', (req, res) => {

})



module.exports = router