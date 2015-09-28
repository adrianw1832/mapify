function Map(scalingFactor, mapContext) {
  this.scalingFactor = scalingFactor;
  this.mapContext = mapContext;
  this.dataStorage = [];
}

Map.prototype.plotTweet= function(tweet) {
  this.dataStorage.push(tweet);
  var xCoord = (tweet.coordinates[0]+ 180) * this.scalingFactor;
  var yCoord = (90 - tweet.coordinates[1]) * this.scalingFactor;
  this.mapContext.beginPath();
  this.mapContext.arc(xCoord, yCoord, 1.5, 0, Math.PI * 2, true);
  this.mapContext.fillStyle = tweet.sentimentColour;
  this.mapContext.fill();
};

Map.prototype.redrawTweets = function(newScale) {
  for (var i = 0; i < this.dataStorage.length; i++) {
    var xCoord = (this.dataStorage[i].coordinates[0]+ 180) * newScale;
    var yCoord = (90 - this.dataStorage[i].coordinates[1]) * newScale;
    this.mapContext.beginPath();
    this.mapContext.arc(xCoord, yCoord, 1.5, 0, Math.PI * 2, true);
    this.mapContext.fillStyle = this.dataStorage[i].sentimentColour;
    this.mapContext.fill();
  }
};

module.exports = Map;
