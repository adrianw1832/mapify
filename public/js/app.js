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

    // $('.input-group').hide();

    // $('.image').remove();

    // $('body').fadeOut(300, function() {
    //   $(this).css('background-color', 'black');
    // });

    // $('.tweetMap').show();

    $('.image').fadeOut("slow", function() {
      $(this).remove();
    });

    $('.input-group').hide("slow");

    $('body').css('background-color', 'black');

    $('.tweetMap').delay(500).fadeIn("slow");
    $('.percentages').delay(500).fadeIn("slow");
    // $('.tweetMap').show();
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

    $.getJSON('http://localhost:3000/tweets/' + searchTerm + '/percentages', function(percentageNumbers) {
      if (percentageNumbers.totalTweets == 0) {
        return
      } else {
        $('.neutral').html("Neutral: " + percentageNumbers.neutral + "%");
        $('.positive').html("Positive: " + percentageNumbers.positive + "%");
        $('.negative').html("Negative: " + percentageNumbers.negative + "%");
      }
    })
  });

  drawMapBackground();
  $('.tweetMap').hide();
  $('.percentages').hide();

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
