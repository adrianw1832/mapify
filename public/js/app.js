$(document).ready(function() {

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 3;
  var mapWidth = baseWidth * scalingFactor; // X-axis/Longitude: Value + 180
  var mapHeight = baseHeight * scalingFactor; // Y-axis/Latitude: 90 - Value
  var map = new Map(scalingFactor, mapContext);
  var socket = io();

  function drawMapBackground() {
    mapCanvas.height = mapHeight;
    mapCanvas.width = mapWidth;
    mapContext.fillStyle = "#BEB9FF";
    mapContext.fillRect(0, 0, mapWidth, mapHeight);
  };

  // Untested Feature Test
  function plotTweets() {
    map.plotCoords(104, 1);
    map.plotCoords(-102, 23);
    map.plotCoords(-35, -8);
    map.plotCoords(110, -8);
    map.plotCoords(-97, 35);
    $('body').append('<h1 class="test">Potato</h1>')
  };

  $('.plotTweets').click(function() {
    plotTweets();
  });

  // PRINTS COORDINATES FROM THE DATABASE
  socket.on('coordinate', function(coordinate) {
    map.plotCoords(coordinate[0], coordinate[1]);
  });



  // socket.on('coordinates', function(coordinates) {
  //   slowDown(coordinates.length - 1, coordinates);
  //   // console.log(coordinates);
  // });

  // function slowDown(index, coordinates) {
  //   if (index < 0) return;
  //   map.plotCoords(coordinates[index].coordinates[0], coordinates[index].coordinates[1]);
  //   setTimeout(slowDown(index - 1, coordinates), 40000);
  // };

  //Testing
  drawMapBackground();

  // FOR TESTING IMAGES GETTING BASE64
  // setTimeout(function() {
  //   var dataURL = mapCanvas.toDataURL();
  //   console.log(dataURL);
  // }, 2000);



});