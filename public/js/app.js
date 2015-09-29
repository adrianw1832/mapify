$(document).ready(function() {

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapContext = mapCanvas.getContext('2d');
  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 4;
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

	var scaleFactor = 1.1;
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
