// var TweetModel = require('./models/tweet.js');
// // var App = require('./app.js');

// var allCoordinates = [];

// function queryCoords() {
//   TweetModel.find( {}, { coordinates: 1, _id: 0 }, function(err, coords) {
//     if(err) return console.error(err);
//     appendCoords(coords);
//     //App FUNCTION THAT PLOTS into MAP GOES HERE THEN PASSESS IN `allCoordinates` as ARGUMENT
//   });
// }

// function appendCoords(coords){
//   for (var i = 0; i < coords.length; i++) {
//     allCoordinates.push(coords[i].coordinates);
//   }
// }

// module.exports = queryCoords;
