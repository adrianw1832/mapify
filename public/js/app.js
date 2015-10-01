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
  var toggleMode = true;
  var isFinishedPlotting = false;


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

  function fadingAnimations() {
    $('#header').fadeOut(500, function() {
      $(this).remove();
    });
    $('.container').fadeOut(500, function() {
      $(this).remove();
    });
    $('body').css('background-color', 'black');
    $('#nextPage').delay(500).fadeIn("slow");
  };



  $('.searchSubmit').click(function() {
    fadingAnimations();
    var searchTerm = $('.searchTerm').val();
    $('#nextPage h2').html('#' + searchTerm);
    displayTweetMap(searchTerm);
    displayPercents(searchTerm);
  });

  function displayTweetMap(searchTerm) {
    $.getJSON(localhostTestURL + searchTerm, function(tweets) {
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
      isFinishedPlotting = false;
      setTimeout(function() {
        isFinishedPlotting = true;
        toggleMode = true;
      }, 100);
      displayPercents(searchTerm);
    });
  };

  function displayPercents(searchTerm) {
        $.getJSON(localhostTestURL + searchTerm + '/percentages', function(percentageNumbers) {
          $('.progress-bar-custom').width(0);

          $('.progress-bar-success').width(percentageNumbers.positive +'%');

          $('.progress-bar-warning').width(percentageNumbers.neutral +'%');
          $('.progress-bar-danger').width(percentageNumbers.negative +'%');

          if (!_isBelowFive(percentageNumbers.positive)) { $('.positive').html(percentageNumbers.positive + "%") };
          if (!_isBelowFive(percentageNumbers.neutral)) { $('.neutral').html(percentageNumbers.neutral + "%") };
          if (!_isBelowFive(percentageNumbers.negative)) { $('.negative').html(percentageNumbers.negative + "%") };
          $('.totalTweets').html(percentageNumbers.totalTweets + ' Tweets');

        });

        function _isBelowFive(number) {
          return number < 5
        }
      }

  $(".hashtag").dblclick(function (event) {
    if (toggleMode && isFinishedPlotting) {
      toggleMode = false;
      event.stopPropagation();
      var textElement = $(this);
      var textValue = $(this).html();
      $('.editable').css('color', 'black');
      updateVal(textElement, textValue);
    }
  });


  function updateVal(textElement, textValue) {
    textValue = textValue.replace(textValue[0], '');
    $(textElement).html('<input class="editText" type="text" minlength="1" value="' + textValue + '" />');
    $(".editText").focus();
    $(".editText").keyup(function (event) {
        if (event.keyCode == 13) {
            $('.editable').css('color', 'white');
            var newSearchTerm = $('.editText').val();
            $(textElement).html(('#' + newSearchTerm).trim());
            drawMapBackground();
            map.tweetArray = [];
            $('.neutral').html('');
            $('.positive').html('');
            $('.negative').html('');
            $('.totalTweets').html('');
            displayTweetMap(newSearchTerm);
        }
    });
  }

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
