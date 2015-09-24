var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var io = require('socket.io')(http);

app.use(express.static('public'));
var streamTweets = require('../public/js/tweetStream.js');
// var plotCoords = require('./public/js/tweetsCoordinates.js');
var tweetsDatabase = require('./models/tweet.js');

//* RUN TO POPULATE MONGODB with TWEETS *//
//****************
// streamTweets();

//* (RUN WHEN READY) TO PLOT COORDS INTO APP
// queryCoords();

/*Get home page */
var routes = require('./routes/index.js');

io.on('connection', function(socket) {

  function queryCoords() {
    tweetsDatabase.find( {}, { coordinates: 1, _id: 0 }, function(err, coords) {
      if(err) return console.error(err);
      sendCoords(coords);
      // emitCoords(coords.length - 1, coords);
    });
  }

  // function emitCoords(index, coordinates) {
  //   if(index < 0) return;
  //   io.emit('coordinate', coordinates[index].coordinates);
  //   coordinates.splice(-1, 1);
  //   setTimeout(emitCoords(coordinates.length - 1, coordinates), 10000);
  // };

  function sendCoords(coordinates) {
    for (var i = 0; i < coordinates.length; i++) {
      io.emit('coordinate', coordinates[i].coordinates);
    }
  };

  queryCoords();
})

http.listen(3000, function() {
  console.log('listening on *:3000');
});
