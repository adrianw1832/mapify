var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();


app.use(express.static('public'));
var TweetModel = require('./public/js/models/tweet.js');

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
//       createdAt:    tweet.created_at,
//       tweetID:      tweet.id,
//       coordinates:  tweet.coordinates.coordinates,
//       text:         tweet.text
//     })
//     newTweet.save(function(err, newTweet){
//       if(err) return console.error(err);
//     })
//     // console.log(tweet);
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
// }
// setTimeout(function() {
//   console.log(allCoordinates);
// }, 1000);

//* Show saved items in MongoDB *//
TweetModel.find(function(err,tweets){
  if(err) return console.error(err);
  console.log(tweets);
})

