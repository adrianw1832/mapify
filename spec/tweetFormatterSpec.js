var tweetFormatter = require('../public/js/tweetFormatter');

describe("formatting the tweet", function () {
  it('should return an array of words in lower case letters', function() {
    expect(tweetFormatter.format(mockTweet).text).toEqual(['some', 'random', 'tweet']);
  });
});
