require('dotenv').config();

const mongoose = require('mongoose');
const Schema = require("./schema.js");

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function() {
    console.log("database has been connected!");
});

const UserModel = Schema.UserModel
const SeriesModel = Schema.SeriesModel
const ComicsModel = Schema.ComicsModel

const scott = new UserModel({
    name: "Scott",
    password: "Pass1word",
    email: "test@gmail.com",
    username: scottl
})

const deadpool = new SeriesModel( {
    title: "Deadpool",
    totalComics: 6,
    description: "He's annoying. He's dangerous. He smells terrible. But the public love him. That's right-the Merc with the Mouth may make money for missions of murky morality...but he's become the most popular hero in the world for it. Eat that, Spidey! The world belongs to...DEADPOOL. The fan favorite team of Gerry Duggan and Mike Hawthorne return to bring Deadpool in to his most successful adventures yet!"    
})

const deadpool1 = new ComicsModel( {
    title: "Deadpool #1",
    publishedDate: "November 04, 2015",
    volumeNumber: 1,
    price: 4.99,
    publisher: "Marvel"
})
const deadpool2 = new ComicsModel( {
    title: "Deadpool #2",
    publishedDate: "November 18, 2015",
    volumeNumber: 1,
    price: 3.99,
    publisher: "Marvel"
})