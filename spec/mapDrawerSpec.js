describe('Map Drawer', function() {

  var mapDrawer;
  var mapContext = {
    arc: function() {}
  };

  // beforeEach(function() {
  //   mapDrawer = new mapDrawer(mapContext);
  // });

  describe('Convert longitude and latitude to coordinates', function() {
    spyOn(mapContext, 'arc');
    mapDrawer = new mapDrawer(mapContext);
    mapDrawer.drawCoords(104, 1)
    expect(mapContext.arc).toHaveBeenCalledWith(852, 267, 2, 0, Math.PI * 2, true);
  });


});