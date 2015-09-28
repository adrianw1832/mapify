function Map(scalingFactor, mapContext) {
  this.scalingFactor = scalingFactor;
  this.mapContext = mapContext;
}

Map.prototype.plotTweet= function(tweet) {
  var xCoord = (tweet.coordinates[0] + 180) * this.scalingFactor;
  var yCoord = (90 - tweet.coordinates[1]) * this.scalingFactor;
  this.mapContext.beginPath();
  this.mapContext.arc(xCoord, yCoord, 1.5, 0, Math.PI * 2, true);
  this.mapContext.fillStyle = tweet.sentimentColour;
  this.mapContext.fill();
};

module.exports = Map;
