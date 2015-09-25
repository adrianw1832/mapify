//* MONGO DB Connection with mongoose * //
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var localMongoDB = ('mongodb://localhost/mapifyTest');
var herokuMongoURI = uriUtil.formatMongoose("mongodb://heroku_j63z0ktq:211konangia06n9312mniu22bq@ds051933.mongolab.com:51933/heroku_j63z0ktq");
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };


function isServerRunningHeroku(){
  var herokuPort = 5000;
  return herokuPort === process.env.PORT;
}

isServerRunningHeroku() ? mongoose.connect(herokuMongoURI, options) : mongoose.connect(localMongoDB)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
// });

//*TWEET SCHEMA AND MODEL FOR MONGO *//
  var tweetSchema = mongoose.Schema({
    createdAt:    Date,
    tweetID:      Number,
    coordinates:  Array,
    text:         String,
    sentimentValue: Number,
    sentimentColour: String
  });

//*TO USE TWEETSCHEMA - WE NEED TO CONVERT IT INTO A MODEL*//
var TweetModel = mongoose.model('Tweet', tweetSchema);

module.exports = TweetModel;
