$(document).ready(function() {

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 4.5;
  var mapWidth = baseWidth * scalingFactor; // X-axis/Longitude: Value + 180
  var mapHeight = baseHeight * scalingFactor; // Y-axis/Latitude: 90 - Value
  var map = new Map(scalingFactor, mapContext);

  function drawMapBackground() {
    mapCanvas.height = mapHeight;
    mapCanvas.width = mapWidth;
    mapContext.fillStyle = "#000000";
    mapContext.fillRect(0, 0, mapWidth, mapHeight);
  };

  $('input:text').keypress(function(event) {
    if (event.keyCode == 13) {
      $('.search-term').click();
    }
  });

  $('.search-term').click(function() {
    $('.homepage').hide();
    $('.tweetMap').show();

    // *** FOR HEROKU DEPLOYMENT *** //
    // $.getJSON('https://stormy-anchorage-2616.herokuapp.com/tweets', function(tweets) {
    //   var index = 0;
    //   var firstTen = 10;
    //   function plotTenByTen() {
    //     if (index <= tweets.length) {
    //       var nextTen = tweets.slice(index, firstTen);
    //       for (var i = 0; i < nextTen.length; i++) {
    //         map.plotCoords(nextTen[i].coordinates[0], nextTen[i].coordinates[1], nextTen[i].sentimentColour);
    //       }
    //       index += 10;
    //       firstTen += 10;
    //     }
    //   };
    //   setInterval(plotTenByTen, 20);
    // });


    // *** FOR LOCAL ENVIRONMENT *** //
    $.getJSON('http://localhost:3000/tweets', function(tweets) {
      var index = 0;
      var firstTen = 10;
      function plotTenByTen() {
        if (index <= tweets.length) {
          var nextTen = tweets.slice(index, firstTen);
          for (var i = 0; i < nextTen.length; i++) {
            map.plotCoords(nextTen[i].coordinates[0], nextTen[i].coordinates[1], nextTen[i].sentimentColour);
          }
          index += 10;
          firstTen += 10;
        }
      };
      setInterval(plotTenByTen, 20);
    });
  });

  drawMapBackground();
  $('.tweetMap').hide();

  // FOR TESTING PLOTTING TWEETS
  function testPlot() {
    map.plotCoords(104, 1, "#FAFBFA");
  };

  $('.testButton').click(function() {
    testPlot();
  });

  // FOR TESTING IMAGES GETTING BASE64
  // setTimeout(function() {
  //   var dataURL = mapCanvas.toDataURL();
  //   console.log(dataURL);
  // }, 1);

});