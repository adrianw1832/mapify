//* MONGO DB Connection with mongoose * //
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var herokuURI = uriUtil.formatMongoose("mongodb://heroku_j63z0ktq:211konangia06n9312mniu22bq@ds051933.mongolab.com:51933/heroku_j63z0ktq");

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

mongoose.connect(herokuURI, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
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
