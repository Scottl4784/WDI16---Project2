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
                },
            );
        });
})

// New
router.get('/new', (req, res) => {
    const userId = req.params.userId
    res.render('series/new', {userId})
})

// Create
router.post('/', (req, res) => {
    const userId = req.params.userId
    const newSeriesInfo = req.body
    User
        .findById(userId)
        .then((user) => {
            const newSeries = new Series(newSeriesInfo)
            user.series.push(newSeries)
            return user.save()
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