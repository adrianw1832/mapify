//* MONGO DB Connection with mongoose * //
export MONGOLAB_URI = "mongodb://heroku_j63z0ktq:211konangia06n9312mniu22bq@ds051933.mongolab.com:51933/heroku_j63z0ktq"

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mapifyTest');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   //DO ANYTHING HERE//
// });

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
