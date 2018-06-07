const express = require('express')
const router = express.Router()
const Series = require('../models/series')

router.get('/', (req, res, next) => {
    Series
    .find()
    .then((seriesList) => {
        res.render('series/index', {seriesList})
    })
    .catch((err) => res.send(err))
})

module.exports = router