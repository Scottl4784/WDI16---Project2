const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const Series = require('../models/series')

// Find all series
router.get('/', (req, res, next) => {
    const userIdToFind = req.params.userId
    User
        .findById(userIdToFind)
        .then((user) => {
            res.render(
                'series/index',
                {
                    seriesList: user.series
                }
            )
        })
})

// New
router.get('/new', (req, res) => {
    const userId = req.params.userId
    res.render('series/new', { userId })
})

// Create
router.post('/', (req, res) => {
    const newSeries = new Series(req.body)

    User.findById(req.params.userId)
        .then((user) => {
            user.series.push(newSeries)
            return user.save()
        })
        .then(() => {
            res.redirect(`/${req.params.userId}/series`)
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
router.delete('/:userId/series', (req, res) => {
    Series.findByIdAndRemove(req.params.seriesId)
        .then(() => {
            console.log('Series Deleted')
            res.redirect(`/${req.params.userId}/series`)
        })
})

module.exports = router