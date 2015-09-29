$(document).ready(function() {

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 4;
  var mapWidth = baseWidth * scalingFactor;
  var mapHeight = baseHeight * scalingFactor;
  var map = new Map(scalingFactor, mapContext);
  var prodDeployURL = "https://mapifyapp.herokuapp.com/tweets/";
  var localhostTestURL = "http://localhost:3000/tweets/";

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

    $('#header').fadeOut(500, function() {
      $(this).remove();
    });

    $('.container').fadeOut(500, function() {
      $(this).remove();
    });

    $('body').css('background-color', 'black');
    $('#nextPage').delay(500).fadeIn("slow");


    var searchTerm = $('.searchTerm').val();

    $('#nextPage h2').html('#' + searchTerm);

    $.getJSON(prodDeployURL + searchTerm, function(tweets) {
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
      displayPercents();
    });

    function displayPercents() {
      $.getJSON(prodDeployURL + searchTerm + '/percentages', function(percentageNumbers) {
        $('.neutral').html("Neutral: " + percentageNumbers.neutral + "%");
        $('.positive').html("Positive: " + percentageNumbers.positive + "%");
        $('.negative').html("Negative: " + percentageNumbers.negative + "%");
        $('.totalTweets').html("Tweets: " + percentageNumbers.totalTweets);
      });
    }
  });

  drawMapBackground();
  $('#nextPage').hide();

  trackTransforms(mapContext);

	var lastX = mapCanvas.width / 2, lastY = mapCanvas.height / 2;
	var dragStart, dragged;

	mapCanvas.addEventListener('mousedown',function(event){
    document.body.style.userSelect = 'none';
		lastX = event.offsetX || (event.pageX);
		lastY = event.offsetY || (event.pageY);
		dragStart = mapContext.transformedPoint(lastX,lastY);
		dragged = false;
	},false);

	mapCanvas.addEventListener('mousemove',function(event){
		lastX = event.offsetX || (event.pageX);
		lastY = event.offsetY || (event.pageY);
		dragged = true;
		if (dragStart){
			var newPoint = mapContext.transformedPoint(lastX,lastY);
			mapContext.translate(newPoint.x - dragStart.x, newPoint.y - dragStart.y);
		  map.redrawTweets(mapWidth, mapHeight);
		}
	},false);

	mapCanvas.addEventListener('mouseup',function(event){
		dragStart = null;
		if (!dragged) zoom(event.shiftKey ? -scaleFactor : scaleFactor );
	},false);

	var scaleFactor = 1.01;
	var zoom = function(clicks){
		var point = mapContext.transformedPoint(lastX,lastY);
		mapContext.translate(point.x, point.y);
		var factor = Math.pow(scaleFactor,clicks);
		mapContext.scale(factor,factor);
		mapContext.translate(-point.x, -point.y);
		map.redrawTweets(mapWidth, mapHeight);
	};

	var handleScroll = function(event){
		var delta = event.wheelDelta ? event.wheelDelta/40 : event.detail ? -event.detail : 0;
		if (delta) zoom(delta);
		return event.preventDefault() && false;
	};
	mapCanvas.addEventListener('DOMMouseScroll',handleScroll,false);
	mapCanvas.addEventListener('mousewheel',handleScroll,false);

	function trackTransforms(mapContext){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		mapContext.getTransform = function(){ return xform; };

		var translate = mapContext.translate;
		mapContext.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(mapContext,dx,dy);
		};

		var point  = svg.createSVGPoint();
		mapContext.transformedPoint = function(xCoord, yCoord){
			point.x = xCoord; point.y = yCoord;
			return point.matrixTransform(xform.inverse());
		};
	}

});
