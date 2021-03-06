var tweetFormatter = function() {
};

tweetFormatter.prototype.format = function (tweet) {
  var strippedTweet = _stripTweetOfPunctuations(tweet.text);
  var formattedTweet = _formatTweet(strippedTweet);
  return formattedTweet;
};

function _stripTweetOfPunctuations(text) {
  return text.replace(/[^a-zA-Z ]/g, '');
}

function _formatTweet(text) {
  return text.toLowerCase().split(' ').filter(Boolean);
}

module.exports = tweetFormatter;
