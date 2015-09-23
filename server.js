var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();

app.use(express.static('public'));
var streamTweets = require('./public/js/tweetStream.js');
var plotCoords = require('./public/js/tweetsCoordinates.js');


//* RUN TO POPULATE MONGODB with TWEETS *//
//****************
// streamTweets();

//* (RUN WHEN READY) TO PLOT COORDS INTO APP
// plotCoords();



/*Get home page */
router.get('/', function (req, res) {
  res.render('index');
});


