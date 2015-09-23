var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var io = require('socket.io')(http);

app.use(express.static('public'));
var streamTweets = require('./public/js/tweetStream.js');
// var plotCoords = require('./public/js/tweetsCoordinates.js');
var tweetsDatabase = require('./model/tweet.js');

var allCoordinates = [];

function queryCoords() {
  tweetsDatabase.find( {}, { coordinates: 1, _id: 0 }, function(err, coords) {
    if(err) return console.error(err);
    for (var i = 0; i < coords.length; i++) {
      allCoordinates.push(coords[i].coordinates);
    }
  });
}


//* RUN TO POPULATE MONGODB with TWEETS *//
//****************
// streamTweets();

//* (RUN WHEN READY) TO PLOT COORDS INTO APP
queryCoords();



/*Get home page */
router.get('/', function (req, res) {
  res.render('index');
});

io.on('connection', function(socket) {

  setTimeout(function() {
    io.emit('coordinates', allCoordinates);
  }, 1000);

})

http.listen(3000, function() {
  console.log('listening on *:3000');
});
