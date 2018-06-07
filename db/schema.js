const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ComicsSchema = new Schema({
    title: String,
    publishedDate: String,
    volumeNumber: Number,
    pageCount: Number,
    price: Number,
    publisher: String,
    description: String
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