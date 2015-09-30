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
  var formatSearchTerm = "\\" + "\"" + req.params.searchTerm + "\\" + "\"";
  console.log(typeof formatSearchTerm)

  tweetsDatabase.find( { $text: { $search: '' } }, { coordinates: 1, sentimentColour:1, _id: 0 }, function(err, coords) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      console.log("Inside hardcoded: ", coords.length)
      percentages["totalMapTweets"] = coords.length;
      res.json(coords);
    }
  })
  .limit(15000);
}

function queryPercentages(req, res) {
  var formatSearchTerm = "\\" + "\"" + req.params.searchTerm + "\\" + "\"";
  console.log(formatSearchTerm)

  tweetsDatabase.find( { $text: { $search: formatSearchTerm }, sentimentValue: 0 }, { sentimentValue: 1, _id: 0 }, function(err, neutralTweets) {
      tweetsDatabase.find( { $text: { $search: formatSearchTerm }, sentimentValue: {$gt: 0} }, { sentimentValue: 1, _id: 0 }, function(err, positiveTweets) {

        tweetsDatabase.find( { $text: { $search: formatSearchTerm }, sentimentValue: {$lt: 0} }, { sentimentValue: 1, _id: 0 }, function(err, negativeTweets) {

          _addTotalTweets(neutralTweets,negativeTweets,positiveTweets);
          _calNeutralTweets(neutralTweets);
          _calNegativeTweets(negativeTweets);
          _calPositiveTweets(positiveTweets);
          console.log("Total Tweets Inside queryPercentages: ", percentages.totalTweets)
          res.json(percentages);
        }).limit(20000)
      }).limit(20000)
  }).limit(20000);

  function _calPercentages(count) {
    return Math.round((count.length / percentages.totalTweets) * 1000) / 10;
  }

  function _addTotalTweets(neutral,negative,positive) {
    percentages['totalTweets'] = neutral.length + positive.length + negative.length;
  }
  function _calNeutralTweets(neutralTweets) { percentages["neutral"] = _calPercentages(neutralTweets) }
  function _calNegativeTweets(negativeTweets) { percentages["negative"] = _calPercentages(negativeTweets) }
  function _calPositiveTweets(positiveTweets) { percentages["positive"] = _calPercentages(positiveTweets) }

};

module.exports = router;
