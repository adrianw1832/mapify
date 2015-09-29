var express = require('express');
var app = express();
var router = express.Router();
var tweetsDatabase = require('../models/tweet.js');
var percentages = {};

router.get('/', function(req, res) {
  res.sendFile('/index.html');
});

router.get('/tweets/:searchTerm/percentages', queryPercentages)
router.get('/tweets/:searchTerm', queryCoords);

function queryCoords(req, res) {
  tweetsDatabase.find( { $text: { $search: req.params.searchTerm } }, { coordinates: 1, sentimentColour:1, _id: 0 }, function(err, coords) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      percentages["totalTweets"] = coords.length;
      res.json(coords);
    }
  })
  .limit(10000);
}

function queryPercentages(req, res) {
  tweetsDatabase.find( { $text: { $search: req.params.searchTerm }, sentimentValue: 0 }, { sentimentValue: 1, _id: 0 }, function(err, neutralCount) {
    percentages["neutral"] = calPercentages(neutralCount);

      tweetsDatabase.find( { $text: { $search: req.params.searchTerm }, sentimentValue: {$gt: 0} }, { sentimentValue: 1, _id: 0 }, function(err, positiveCount) {
        percentages["positive"] = calPercentages(positiveCount);

        tweetsDatabase.find( { $text: { $search: req.params.searchTerm }, sentimentValue: {$lt: 0} }, { sentimentValue: 1, _id: 0 }, function(err, negativeCount) {
          percentages["negative"] = calPercentages(negativeCount);
          res.json(percentages);
        }).limit(10000)
      }).limit(10000)
  }).limit(10000);
  function calPercentages(count) {
    return Math.round((count.length / percentages.totalTweets) * 1000) / 10;
  }


};

module.exports = router;
