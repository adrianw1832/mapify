exports.format = function(tweet) {
  var formattedTweet = tweet.text.toLowerCase().split(' ');
  tweet.text = formattedTweet;
  return tweet;
}
