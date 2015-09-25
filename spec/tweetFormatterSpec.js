var tweetFormatterObject = require('../public/js/tweetFormatter');
var tweetFormatter = new tweetFormatterObject();

describe("formatting the tweet", function () {
  it('should return an array of words in lower case letters', function() {
    expect(tweetFormatter.format(mockTweet).text).toEqual(['some', 'random', 'tweet']);
  });

  it('should strip the tweet of all punctuations', function() {
    expect(tweetFormatter.format(mockTweetWithPunctuations).text).toEqual(['nothing', 'left']);
  });
});
