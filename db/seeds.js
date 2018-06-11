require('dotenv').config()

const mongoose = require('mongoose')
const Schema = require("./schema.js")

mongoose.connect('mongodb://localhost/comic-tracker')
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch((err) => {
        console.log('ERROR', err)
    })

const User = require('../models/user')
const UserModel = Schema.User
const SeriesModel = Schema.Series
const ComicsModel = Schema.Comics

User.remove()
    .then(() => {
        const scott = new UserModel({
            name: "Scott",
            password: "Pass1word",
            email: "test@gmail.com",
            username: 'scottl'
        })

        const deadpoolSeries = new SeriesModel({
            title: "Deadpool",
            totalComics: 3,
            description: "He's annoying. He's dangerous. He smells terrible. But the public love him. That's right-the Merc with the Mouth may make money for missions of murky morality...but he's become the most popular hero in the world for it. Eat that, Spidey! The world belongs to...DEADPOOL. The fan favorite team of Gerry Duggan and Mike Hawthorne return to bring Deadpool in to his most successful adventures yet!"
        })

        const spidermanSeries = new SeriesModel({
            title: "The Amazing Spiderman",
            totalComics: 3,
            description: "SECRET EMPIRE TIE-IN! On orders from Captain America, the Superior Octopus is taking the fight to Parker Industries. Peter must use the full force of his company to stop Ock and Hydra, but WILL IT BE ENOUGH?!"
        })

        const deadpool1 = new ComicsModel({
            title: "Deadpool #1",
            publishedDate: "November 04, 2015",
            volumeNumber: 1,
            price: 4.99,
            writer: "Gerry Duggan",
            img: "https://i.annihil.us/u/prod/marvel/i/mg/8/a0/562e73baa2c04/detail.jpg"
        })
        const deadpool2 = new ComicsModel({
            title: "Deadpool #2",
            publishedDate: "November 18, 2015",
            volumeNumber: 2,
            price: 3.99,
            writer: "Gerry Duggan"
        })

        const deadpool3 = new ComicsModel({
            title: "Deadpool #2",
            publishedDate: "November 30, 2015",
            volumeNumber: 3,
            price: 4.99,
            writer: "Gerry Duggan"
        })

        const spiderman1 = new ComicsModel({
            title: "Spiderman #1",
            publishedDate: "10/4/2012",
            volumeNumber: 1,
            price: 4.99,
            writer: "Dan Slott"
        })
        const spiderman2 = new ComicsModel({
            title: "Spiderman #2",
            publishedDate: "10/16/2012",
            volumeNumber: 2,
            price: 4.99,
            writer: "Dan Slott"
        })
        const spiderman3 = new ComicsModel({
            title: "Spiderman #3",
            publishedDate: "10/30/2012",
            volumeNumber: 3,
            price: 4.99,
            writer: "Dan Slott"
        })


        // associating user with series and series with comics
        deadpoolSeries.comics = [deadpool1, deadpool2, deadpool3]

        spidermanSeries.comics = [spiderman1, spiderman2, spiderman3]

        scott.series = [deadpoolSeries, spidermanSeries]


        const users = [scott]

        users.forEach((user) => {
            user.save()
                .then((user) => {
                    console.log(`${user.name} saved!`)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    })

