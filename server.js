var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();

app.use(express.static('public'));

/*Get home page */
router.get('/', function (req, res) {
  res.render('index');
});


var Twit = require('twit');

var T = new Twit({
  consumer_key:         process.env.TWITTER_API_KEY,
  consumer_secret:      process.env.TWITTER_API_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// T.get('search/tweets', { q: 'obama since:2015-09-15', count: 10 }, function(err, data, response) {
//   console.log(data);
http.listen(3000, function(){
  console.log('listening on *:3000');
});
// });

// var world = ['-180', '-90', '180', '90'];
// var stream = T.stream('statuses/filter', {
//   locations: world,
//   language: 'en'
// });
// // var counter = 0;
// stream.on('tweet', function (tweet) {
//   if (tweet.geo !== null) {
//     // counter++;
//     console.log(tweet.coordinates.coordinates);
//   }
// });

// Singapore
//   geo: { type: 'Point', coordinates: [ 1.314682, 103.893371 ] },
//  coordinates: { type: 'Point', coordinates: [ 103.893371, 1.314682 ] },

