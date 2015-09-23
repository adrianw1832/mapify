var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();

app.use(express.static('public'));
var streamTweets = require('./public/js/tweetStream.js');
// streamTweets();

/*Get home page */
router.get('/', function (req, res) {
  res.render('index');
});


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



