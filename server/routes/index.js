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
      percentages["totalMapTweets"] = coords.length;
      res.json(coords);
    }
  })
  .limit(10000);
}

function queryPercentages(req, res) {
  tweetsDatabase.find( { $text: { $search: req.params.searchTerm }, sentimentValue: 0 }, { sentimentValue: 1, _id: 0 }, function(err, neutralCount) {

      tweetsDatabase.find( { $text: { $search: req.params.searchTerm }, sentimentValue: {$gt: 0} }, { sentimentValue: 1, _id: 0 }, function(err, positiveCount) {

        tweetsDatabase.find( { $text: { $search: req.params.searchTerm }, sentimentValue: {$lt: 0} }, { sentimentValue: 1, _id: 0 }, function(err, negativeCount) {
          percentages['totalTweets'] = neutralCount.length + positiveCount.length + negativeCount.length;
          percentages["negative"] = calPercentages(negativeCount);
          percentages["neutral"] = calPercentages(neutralCount);
          percentages["positive"] = calPercentages(positiveCount);

          if(percentages.totalMapTweets === percentages.totalTweets) {
            res.json(percentages)
          } else {
            console.error("Total Map Tweets is: ", percentages.totalMapTweets)
            console.error("totalTweets is: ", percentages.totalTweets)
          }
        }).limit(10000)
      }).limit(10000)
  }).limit(10000);

  function calPercentages(count) {
    return Math.round((count.length / percentages.totalTweets) * 1000) / 10;
  }


};

module.exports = router;
