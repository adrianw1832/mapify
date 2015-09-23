var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();

app.use(express.static('public'));
var streamTweets = require('./public/js/tweetStream.js');
// var plotCoords = require('./public/js/tweetsCoordinates.js');
var TweetModel = require('./public/js/models/tweet.js');

var allCoordinates = [];

function queryCoords() {
  TweetModel.find( {}, { coordinates: 1, _id: 0 }, function(err, coords) {
    if(err) return console.error(err);
    appendCoords(coords);
    //App FUNCTION THAT PLOTS into MAP GOES HERE THEN PASSESS IN `allCoordinates` as ARGUMENT
  });
}

function appendCoords(coords){
  for (var i = 0; i < coords.length; i++) {
    allCoordinates.push(coords[i].coordinates);
  }
}


console.log(allCoordinates);


//* RUN TO POPULATE MONGODB with TWEETS *//
//****************
// streamTweets();

//* (RUN WHEN READY) TO PLOT COORDS INTO APP
queryCoords();



/*Get home page */
router.get('/', function (req, res) {
  res.render('index');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
