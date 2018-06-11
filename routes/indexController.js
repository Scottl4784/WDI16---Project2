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
    res.render('users/new')
})

router.post('/', (req, res) => {
  
})



module.exports = router