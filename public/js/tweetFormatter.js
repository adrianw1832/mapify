var format = function(tweet) {
  var strippedTweet = _stripTweetOfPunctuations(tweet.text)
  var formattedTweet = _formatTweet(strippedTweet);
  tweet.text = formattedTweet;
  return tweet;
};

function _stripTweetOfPunctuations(text) {
  return text.replace(/[^a-zA-Z ]/g, '');
}

function _formatTweet(text) {
  return text.toLowerCase().split(' ').filter(Boolean);
}
module.exports = format;
