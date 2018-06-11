const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const Series = require('../models/series')
const Comics = require('../models/comics')

router.get('/', (req, res, next) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    const comicsId = req.params.comicsId
    User
        .findById(userId)
        .then((user) => {
            res.render(
                'comics/index', {
                    comicsList: series.comics
                })
        })
        .catch((err) => res.send(err))
})
// New
router.get('/new', (req, res) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    const comicsId = req.params.comicsId
    res.render('comics/new', { 
        userId,
        seriesId
     })
})

// Create
router.post('/', (req, res) => {
    const newComic = new Comics(req.body)
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    User.findById(userId)
        .then((user) => {
            user.series.id(seriesId).comics.push(newComic)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/series/${seriesId}/comics`)
        })
})

// Show
router.get('/:comicsId', (req, res) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    const comicsId = req.params.comicsId
    User
        .findById(userId)
        .then((user) => {
            const series = user.series.id(seriesId)
            const comics = series.comics.id(comicsId)
            res.render('comics/show', { 
                comics,
                series,
                user
             })
        })
})

// Delete
router.delete('/:comicsId', (req, res) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    const comicsId = req.params.comicsId
    User.findById(userId)
        .then((user) => {
            user.series.id(seriesId).comics.id(comicsId).remove()
            return user.save()
        })
        .then(() => {
            console.log('Series Deleted')
            res.redirect(`/users/${userId}/series/${seriesId}/comics`)
        })
})

module.exports = router