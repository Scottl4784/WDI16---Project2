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
    res.render('comics/new', { userId })
})

// Create
router.post('/', (req, res) => {
    const newComic = new Comic(req.body)
    const userId = req.params.userId
    const seriesId = req.params.seriesId
    User.findById(userId)
        .then((user) => {
            const series = user.series
            series.comics.push(newComic)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/series/${seriesId}/comics`)
        })
})

module.exports = router