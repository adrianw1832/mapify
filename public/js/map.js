function Map(scalingFactor, mapContext) {
  this.scalingFactor = scalingFactor;
  this.mapContext = mapContext;
};

// Untested Unit Tests
Map.prototype.plotCoords = function(longitude, latitude) {
  var xCoord = (longitude + 180) * this.scalingFactor;
  var yCoord = (90 - latitude) * this.scalingFactor;
  // LocationDrawer.plots(this.mapContext, xCoord, yCoord);
  this.mapContext.beginPath();
  this.mapContext.arc(xCoord, yCoord, 2, 0, Math.PI * 2, true);
  this.mapContext.fillStyle = "#000000"
  this.mapContext.fill();
};

// var LocationDrawer = (function() {

//   function plots(context, xCoord, yCoord) {
//     context.beginPath();
//     context.arc(xCoord, yCoord, 2, 0, Math.PI * 2, true);
//     context.fillStyle = "#000000"
//     context.fill();
//   };

//   return {
//     plots: plots
//   };

// })();
