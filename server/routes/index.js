var express = require('express');
var app = express();
var router = express.Router();
var tweetsDatabase = require('../models/tweet.js');
// var searchTerm = require('../../public/js/app.js')

router.get('/', function(req, res) {
  res.sendFile('/index.html');
});

router.get('/tweets/:searchTerm', queryCoords);

//for additional search terms matching see: http://docs.mongodb.org/manual/reference/operator/query/text/#text-operator-text-score

function queryCoords(req, res) {
  tweetsDatabase.find( { $text: { $search: req.params.searchTerm } }, { coordinates: 1, sentimentColour:1, _id: 0 }, function(err, coords) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      res.json(coords);
    }
  })
  .limit(25000);
}

module.exports = router;
