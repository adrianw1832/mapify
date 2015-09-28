var mapClass = require('../public/js/map.js');

describe('Map', function() {

  var map;
  var scalingFactor = 3;
  var mapContext = {
    arc: function() {},
    beginPath: function() {},
    fill: function() {}
  };

  beforeEach(function() {
    map = new mapClass(scalingFactor, mapContext);
    tweet = {
      coordinates: [104, 1],
      colour: "#000000"
    };
  });

  it('plots coordinates on the canvas accurately', function() {
    spyOn(mapContext, 'arc');
    map.plotTweet(tweet);
    var xCoord = (104 + 180) * scalingFactor;
    var yCoord = (90 - 1) * scalingFactor;
    expect(mapContext.arc).toHaveBeenCalledWith(xCoord, yCoord, 1.5, 0, Math.PI * 2, true);
  });
});
