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

// Show
router.get('/:userId/series', (req, res) => {
  const userId = req.params.userId
  User.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user,
        series: user.series
      })
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

// Delete
router.delete('/:userId', (req, res) => {
  const userId = req.params.userId
  User.findByIdAndRemove(userId)
    .then((user) => {
      return user.save()
    })
    .then(() => {
      res.redirect(`/users`)
    })
})


module.exports = router