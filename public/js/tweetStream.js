var T = require('./twit');
var TweetModel = require('../../server/models/tweet');
var formatTweet = require('./tweetFormatter.js');
var sentimentCalculate = require('./sentimentCalculator.js');
var sentimentColour = require('./colourGenerator.js');


// STREAMING & SAVING INTO MONGO CODE
// ---------------------------------
var world = ['-180', '-90', '180', '90'];
var stream = T.stream('statuses/filter', {
  locations: world,
  language: 'en'
});

function streamOn() {
  stream.on('tweet', function (tweet) {
    if (tweet.geo !== null) {
      var sentimentValue = sentimentCalculate(formatTweet(tweet).text);
      var newTweet = new TweetModel({
        createdAt:    tweet.created_at,
        tweetID:      tweet.id,
        coordinates:  tweet.coordinates.coordinates,
        text:         tweet.text,
        sentimentValue: sentimentValue,
        sentimentColour: sentimentColour(sentimentValue)
      })
      newTweet.save(function(err, newTweet){
        if(err) return console.error(err);
      })
    }
  });
};

module.exports = streamOn;