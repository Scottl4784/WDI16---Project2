const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ComicsSchema = new Schema({
    title: String,
    publishedDate: String,
    volumeNumber: Number,
    pageCount: Number,
    price: Number,
    writer: String,
    description: String,
    img: String 
})

const SeriesSchema = new Schema({
    title: String,
    totalComics: Number,
    comics: [ComicsSchema],
    description: String   
})

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    series: [SeriesSchema]
  })


const UserModel = mongoose.model('User', UserSchema)
const SeriesModel = mongoose.model('Series', SeriesSchema)
const ComicsModel = mongoose.model('Comics', ComicsSchema)

// Exports schema
module.exports = {
  User: UserModel,
  Series: SeriesModel,
  Comics: ComicsModel
}