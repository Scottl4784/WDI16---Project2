const express = require('express')
const router = express.Router()
const Series = require('../models/series.js')

router.get('/signup', function(req, res){
})

router.post('/', authHelpers.createSecure, function(req, res){
})

module.exports = router