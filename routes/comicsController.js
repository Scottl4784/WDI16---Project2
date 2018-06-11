const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const Series = require('../models/series')
const Comics = require('../models/comics')

router.get('/', (req, res, next) => {
    const userId = req.params.userId
    const seriesId = req.params.seriesId
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

module.exports = router