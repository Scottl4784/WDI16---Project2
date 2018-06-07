const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ComicsSchema = new Schema({
    title: String,
    publishedDate: Date,
    volumeNumber: Number,
    pageCount: Number,
    price: Number,
    publisher: String,
    description: String
})

const SeriesSchema = new Schema({
    title: String,
    totalComics: Number,
    comics: [ComicsSchema]     
})

const UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    series: [SeriesSchema],
    created_at: Date,
    updated_at: Date
  })

UserSchema.pre('save', function(next) {
  now = new Date()
  this.updated_at = now

  if (!this.created_at) { this.created_at = now }
  next()
})

const UserModel = mongoose.model('User', UserSchema)
const SeriesModel = mongoose.model('Series', SeriesSchema)
const ComicsModel = mongoose.model('Comics', ComicsSchema)

module.exports = {
  User: UserModel,
  Series: SeriesModel,
  Comics: ComicsModel
}