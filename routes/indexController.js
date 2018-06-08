const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/login', (req, res) => {
    const userName = req.body.username
    UserModel.findOne({ 'username': userName })
        .then((user) => {
            res.redirect(`/${user.username}`)
        })
        .catch((err) => {
            res.render("error", {
                message: "User doesn't exist",
                err
            })
        })

})



module.exports = router