function Map(scalingFactor, mapContext) {
  this.scalingFactor = scalingFactor;
  this.mapContext = mapContext;
}

Map.prototype.plotCoords = function(longitude, latitude, colour) {
  var xCoord = (longitude + 180) * this.scalingFactor;
  var yCoord = (90 - latitude) * this.scalingFactor;
  this.mapContext.beginPath();
  this.mapContext.arc(xCoord, yCoord, 2, 0, Math.PI * 2, true);
  this.mapContext.fillStyle = colour;
  this.mapContext.fill();
};

module.exports = Map;
