var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();


app.use(express.static('public'));

http.listen(3000, function() {
  console.log('listening on *:3000');
});

//* MONGO DB Connection with mongoose * //
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  //DO ANYTHING HERE//
});

//*TWEET SCHEMA AND MODEL FOR MONGO *//
var tweetSchema = mongoose.Schema({
  tweetID:      Number,
  coordinates:  Array,
  text:         String
});

//*TO USE TWEETSCHEMA - WE NEED TO CONVERT IT INTO A MODEL*//
var Tweet = mongoose.model('Tweet', tweetSchema);


/*Get home page */
router.get('/', function (req, res) {
  res.render('index');
});


// * TWIT - TWITTER STREAM * //

var Twit = require('twit');

var T = new Twit({
  consumer_key:         process.env.TWITTER_API_KEY,
  consumer_secret:      process.env.TWITTER_API_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});


// STREAMING SAVING INTO MONGO CODE
// ---------------------------------
// var world = ['-180', '-90', '180', '90'];
// var stream = T.stream('statuses/filter', {
//   locations: world,
//   language: 'en'
// });
// // var counter = 0;
// stream.on('tweet', function (tweet) {
//   if (tweet.geo !== null) {
//     var newTweet = new Tweet({
//       tweetID:      tweet.id,
//       coordinates:  tweet.coordinates.coordinates,
//       text:         tweet.text
//     })
//     newTweet.save(function(err, newTweet){
//       if(err) return console.error(err);
//     })
//     // console.log(tweet.coordinates.coordinates);
//   }
// });

//*BIG-Coordinates Array*//
// var allCoordinates = [];
// Tweet.find( {}, { coordinates: 1, _id: 0 }, function(err, coords) {
//   if(err) return console.error(err);
//   appendCoords(coords);
// });

// function appendCoords(coords){
//   for (var i = 0; i < coords.length; i++) {
//     allCoordinates.push(coords[i].coordinates);
//   }
//   console.log(allCoordinates);
// }


//* Show saved items in MongoDB *//
// Tweet.find(function(err,tweets){
//   if(err) return console.error(err);
//   console.log(tweets.coordinates[0]);
// })

