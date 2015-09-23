describe('Map', function() {

  var map;
  var scalingFactor = 3;
  var mapContext = {
    arc: function() {},
    beginPath: function() {},
    fill: function() {}
  };

  beforeEach(function() {
    map = new Map(scalingFactor, mapContext);
  });

  it('plots coordinates on the canvas accurately', function() {
    spyOn(mapContext, 'arc');
    map.plotCoords(104, 1);
    expect(mapContext.arc).toHaveBeenCalledWith(852, 267, 2, 0, Math.PI * 2, true);
  });


});