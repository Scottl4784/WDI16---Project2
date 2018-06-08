const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Series = require('../models/series')

// Find all series
router.get('/', (req, res, next) => {
    User
        .find()
        .then((seriesList) => {
            const series = User.Series
            res.render('/index', { seriesList: series })
        })
        .catch((err) => res.send(err))
})

// New
router.get('/new', (req, res) => {
    res.render('series/new')
})

// Create
router.post('/', (req, res) => {
    const newSeries = req.body
    Series
        .create(newSeries)
        .then(() => {
            res.redirect('/series')
        })
})

// Show
router.get('/:id', (req, res) => {
    Series
        .findById(req.params.id)
        .then((seriesList) => {
            res.render('series/show', { seriesList })
        })
})

// Edit
router.get('/:id/edit', (req, res) => {
    Series
        .findById(req.params.id)
        .then((series) => {
            res.render('series/edit', { seriesList })
        })
})

// Update
router.put('/:id', (req, res) => {
    Series.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => {
            res.redirect(`/series/${req.params.id}`)
        })
})

// Delete
router.delete('/:id', (req, res) => {
    Series.findByIdAndRemove(req.params.id)
        .then(() => {
            console.log('Series Deleted')
            res.redirect('series')
        })
})

module.exports = router