function Map(scalingFactor, mapContext) {
  this.scalingFactor = scalingFactor;
  this.mapContext = mapContext;
  this.tweetArray = [];
}

Map.prototype.plotTweet= function(tweet) {
  this.tweetArray.push(tweet);
  var xCoord = (tweet.coordinates[0] + 180) * this.scalingFactor;
  var yCoord = (90 - tweet.coordinates[1]) * this.scalingFactor;
  this.mapContext.beginPath();
  this.mapContext.arc(xCoord, yCoord, 1, 0, Math.PI * 2, true);
  this.mapContext.fillStyle = tweet.sentimentColour;
  this.mapContext.fill();
};

Map.prototype.redrawTweets = function(width, height) {
  // HARD CODED NUMBERS HERE
  this.mapContext.clearRect(0, 0, 2500, 2500);
  for (var i = 0; i < this.tweetArray.length; i++) {
    var xCoord = (this.tweetArray[i].coordinates[0]+ 180) * this.scalingFactor;
    var yCoord = (90 - this.tweetArray[i].coordinates[1]) * this.scalingFactor;
    this.mapContext.beginPath();
    this.mapContext.arc(xCoord, yCoord, 1, 0, Math.PI * 2, true);
    this.mapContext.fillStyle = this.tweetArray[i].sentimentColour;
    this.mapContext.fill();
  }
};

module.exports = Map;
