const express = require('express')
const router = express.Router()
const Series = require('../models/series')

// Find all series
router.get('/', (req, res, next) => {
    Series
        .find()
        .then((seriesList) => {
            res.render('series/index', { seriesList })
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
            res.render('series/show', seriesList)
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

module.exports = router