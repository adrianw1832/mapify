$(document).ready(function() {

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 3;
  var mapWidth = baseWidth * scalingFactor; // X-axis/Longitude: Value + 180
  var mapHeight = baseHeight * scalingFactor; // Y-axis/Latitude: 90 - Value
  var map = new Map(scalingFactor, mapContext);

  function drawMapBackground() {
    mapCanvas.height = mapHeight;
    mapCanvas.width = mapWidth;
    mapContext.fillStyle = "#000000";
    mapContext.fillRect(0, 0, mapWidth, mapHeight);
  };

  //**** FOR HEROKU DEVELOP-BRANCH DEPLOYMENT ******//
  // $.getJSON('https://stormy-anchorage-2616.herokuapp.com/tweets', function(tweets) {
  //   for (var i = 0; i < tweets.length; i++) {
  //     map.plotCoords(tweets[i].coordinates[0], tweets[i].coordinates[1], tweets[i].sentimentColour);
  //   }
  // });
  //****FOR LOCAL ENVIRONMENT******//
  $.getJSON('http://localhost:3000/tweets', function(tweets) {

    for (var i = 0; i < tweets.length; i++) {
      map.plotCoords(tweets[i].coordinates[0], tweets[i].coordinates[1], tweets[i].sentimentColour);
    }
    // for (var i = 0; i < tweets.length; i++) {
    //   map.plotCoords(tweets[i].coordinates[0], tweets[i].coordinates[1], tweets[i].sentimentColour);
    // }
    var counter = 0;
    function next_tweet() {
      var index = counter % tweets.length
      map.plotCoords(tweets[index].coordinates[0], tweets[index].coordinates[1], tweets[index].sentimentColour);
      counter += 1;
    };
    setInterval(next_tweet, 10);
  });

  //Testing
  drawMapBackground();

  // FOR TESTING IMAGES GETTING BASE64
  // setTimeout(function() {
  //   var dataURL = mapCanvas.toDataURL();
  //   console.log(dataURL);
  // }, 5000);

  // FOR TESTING PLOTTING TWEETS
  function testPlot() {
    map.plotCoords(104, 1, "#000000");
  };

  $('.testButton').click(function() {
    testPlot();
  });

});