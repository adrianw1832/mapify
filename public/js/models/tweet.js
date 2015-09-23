//* MONGO DB Connection with mongoose * //
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mapifyTest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  //DO ANYTHING HERE//
});

//*TWEET SCHEMA AND MODEL FOR MONGO *//
var tweetSchema = mongoose.Schema({
  createdAt:    Date,
  tweetID:      Number,
  coordinates:  Array,
  text:         String
});

//*TO USE TWEETSCHEMA - WE NEED TO CONVERT IT INTO A MODEL*//
var TweetModel = mongoose.model('Tweet', tweetSchema);

module.exports = TweetModel;
