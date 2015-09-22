// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
//
// app.use(express.static('public'));
//
// app.get('/', function(req, res){
//   res.sendFile('/index.html');
// });
//
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

var express = require('express');
var router = express.Router();

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

// T.get('search/tweets', { q: 'obama since:2015-09-15', count: 100 }, function(err, data, response) {
//   console.log(data.statuses.length);
// });

var world = ['-180', '-90', '180', '90'];
var stream = T.stream('statuses/filter', {
  locations: world,
  language: 'en'
});
// var counter = 0;
stream.on('tweet', function (tweet) {
  if (tweet.geo !== null) {
    // counter++;
    console.log(tweet);
  }
});
