$(document).ready(function() {

  var mapCanvas = $('.mapCanvas')[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 3;
  var mapWidth = baseWidth * scalingFactor; // X-axis/Longitude: Value + 180
  var mapHeight = baseHeight * scalingFactor; // Y-axis/Latitude: 90 - Value
  var map = new Map(scalingFactor, mapContext);


  //Untested Feature Test
  function drawWorldMap() {
    mapCanvas.height = mapHeight;
    mapCanvas.width = mapWidth;
    mapContext.fillStyle = "#BEB9FF"
    mapContext.fillRect(0, 0, mapWidth, mapHeight)
  };

  // Untested Feature Test
  function plotTweets() {
    map.plotCoords(104, 1);
    map.plotCoords(-102, 23);
    map.plotCoords(-35, -8);
    map.plotCoords(110, -8);
    map.plotCoords(-97, 35);
  };

  $('.plotTweets').click(function() {
    plotTweets();
  });


  //Testing
  drawWorldMap();


});