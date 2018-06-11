const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const Series = require('../models/series')
const Comics = require('../models/comics')

// Find all series
router.get('/', (req, res, next) => {
    const userId = req.params.userId
    User
        .findById(userId)
        .then((user) => {
            res.render(
                'series/index',
                {
                    seriesList: user.series,
                    userId: user._id
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
    const userId = req.params.userId
    User.findById(userId)
        .then((user) => {
            user.series.push(newSeries)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${req.params.userId}/series`)
        })
})

// Show
router.get('/:seriesId/comics', (req, res) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    const comicsId = req.params.comicsId
    User
        .findById(userId)
        .then((user) => {
            const series = user.series.id(seriesId)
            const comics = series.comics.id(comicsId)
            res.render('series/show', { 
                comics,
                series,
                user
             })
        })
})

// Edit
router.get('/:seriesId/edit', (req, res) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    User.findById(userId)
        .then((user) => {
            const series = user.series.id(seriesId)
            res.render('series/edit', { 
                user,
                series 
            })
        })
})

// Update
router.put('/:seriesId', (req, res) => {
    const seriesId = req.params.seriesId
    const userId = req.params.userId
    const newSeriesInfo = req.body
    User.findById(userId)
        .then((user) => {
            const series = user.series.id(seriesId)
            series.title = newSeriesInfo.title
            series.description = newSeriesInfo.description
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/series`)
        })
})

// Delete
router.delete('/:seriesId', (req, res) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    User.findById(userId)
        .then((user) => {
            user.series.id(seriesId).remove()
            return user.save()
        })
        .then(() => {
            console.log('Series Deleted')
            res.redirect(`/users/${userId}/series`)
        })
})

module.exports = router