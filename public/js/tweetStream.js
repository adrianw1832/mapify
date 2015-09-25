var T = require('./twit');
var TweetModel = require('../../server/models/tweet');
var formatTweetObject = require('./tweetFormatter.js');
var sentimentCalculatorObject = require('./sentimentCalculator.js');
var colourGeneratorObject = require('./colourGenerator.js');
var formatTweet = new formatTweetObject();
var sentimentCalculator = new sentimentCalculatorObject();
var colourGenerator = new colourGeneratorObject();

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
      var sentimentValue = sentimentCalculator.calculate(formatTweet.format(tweet));
      var newTweet = new TweetModel({
        createdAt:    tweet.created_at,
        tweetID:      tweet.id,
        coordinates:  tweet.coordinates.coordinates,
        text:         tweet.text,
        sentimentValue: sentimentValue,
        sentimentColour: colourGenerator.gener(sentimentValue)
      })
      newTweet.save(function(err, newTweet){
        if(err) return console.error(err);
      })
    }
  });
};

module.exports = streamOn;
