var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');

app.use(express.static('public'));
var streamTweets = require('../public/js/tweetStream.js');

//* RUN TO POPULATE MONGODB with TWEETS *//
//****************
streamTweets();

/*Get home page */
var routes = require('./routes/index.js');

// *** main routes *** //
app.use('/', routes)

http.listen((process.env.PORT), function(err){
  if(err) return console.error(err);
  console.log('listening on*: ', process.env.PORT);
});

module.exports = app;
