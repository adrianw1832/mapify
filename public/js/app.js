$(document).ready(function() {

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 4.5;
  var mapWidth = baseWidth * scalingFactor;
  var mapHeight = baseHeight * scalingFactor;
  var map = new Map(scalingFactor, mapContext);

  function drawMapBackground() {
    mapCanvas.height = mapHeight;
    mapCanvas.width = mapWidth;
    mapContext.fillStyle = "#000000";
    mapContext.fillRect(0, 0, mapWidth, mapHeight);
  }

  $('.searchTerm').keypress(function(event) {
    if (event.keyCode == 13) {
      $('.searchSubmit').click();
    }
  });

  $('.searchSubmit').click(function() {
    $('.homepage').hide();
    $('.tweetMap').show();
    var searchTerm = $('.searchTerm').val();

    // *** FOR HEROKU DEPLOYMENT *** //
    // $.getJSON('https://stormy-anchorage-2616.herokuapp.com/tweets/' + searchTerm, function(tweets) {
    //   var batchSize = tweets.length / 50;
    //   var startCounter = 0, endCounter = batchSize;
    //   function plotInBatches() {
    //     if (startCounter <= tweets.length) {
    //       var nextBatch = tweets.slice(startCounter, endCounter);
    //       for (var i = 0; i < nextBatch.length; i++) {
    //         map.plotTweet(nextBatch[i]);
    //       }
    //       startCounter += batchSize;
    //       endCounter += batchSize;
    //     }
    //   }
    //   setInterval(plotInBatches, 100);
    // });

    // *** FOR LOCAL ENVIRONMENT *** //
    $.getJSON('http://localhost:3000/tweets/' + searchTerm, function(tweets) {
      var batchSize = tweets.length / 50;
      var startCounter = 0, endCounter = batchSize;
      function plotInBatches() {
        if (startCounter <= tweets.length) {
          var nextBatch = tweets.slice(startCounter, endCounter);
          for (var i = 0; i < nextBatch.length; i++) {
            map.plotTweet(nextBatch[i]);
          }
          startCounter += batchSize;
          endCounter += batchSize;
        }
      }
      setInterval(plotInBatches, 100);
    });
  });

  drawMapBackground();
  $('.tweetMap').hide();

  // var x = d3.scale.linear()
  //   .domain([0, mapWidth])
  //   .range([0, mapWidth]);

  // var y = d3.scale.linear()
  //   .domain([0, mapHeight])
  //   .range([mapHeight, 0]);

  // mapCanvas = d3.select(".canvas")
  //   .attr("width", mapWidth)
  //   .attr("height", mapHeight)
  //   .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 400]).on("zoom", zoom))
  //   .node().getContext("2d");

  // zoom();

  // function zoom() {
  //   mapContext.clearRect(0, 0, mapWidth, mapHeight);
  //   map.redrawTweets(scalingFactor);
  // }

  $(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
      scalingFactor -= 0.1;
      console.log('Scroll up');
    }
    else {
      scalingFactor += 0.1;
      console.log('Scroll down');
    }
    drawMapBackground();
    map.redrawTweets(scalingFactor);
  });

  // var lastScrollTop = 0;
  // $(window).scroll(function(event){
  //    var st = $(this).scrollTop();
  //    if (st > lastScrollTop){
  //       scalingFactor -= 0.5;
  //       drawMapBackground();
  //       map.redrawTweets(scalingFactor);
  //    } else {
  //       scalingFactor += 0.5;
  //       drawMapBackground();
  //       map.redrawTweets(scalingFactor);
  //    }
  //    lastScrollTop = st;
  // });

  // function draw() {
  //   mapCanvas.height = mapHeight;
  //   mapCanvas.width = mapWidth;
  //   mapContext.fillStyle = "#000000";
  //   mapContext.fillRect(0, 0, mapWidth, mapHeight);
  //   // console.log('Potato');
  //   // for (var i = 0; i < dataStore.length; i++) {
  //   //   map.plotTweet(dataStore[i]);
  //   //   console.log(dataStore[i])
  //   //   // dataStore.push(nextBatch[i]);
  //   //   // console.log(dataStore);
  //   // }
  // };

  // FOR TESTING PLOTTING TWEETS
  // function testPlot() {
  //   map.plotCoords(104, 1, "#FAFBFA");
  // }

  // $('.testButton').click(function() {
  //   testPlot();
  // });

  // FOR TESTING IMAGES GETTING BASE64
  // setTimeout(function() {
  //   var dataURL = mapCanvas.toDataURL();
  //   console.log(dataURL);
  // }, 1);

});
