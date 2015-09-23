describe('Mapify App', function() {

  var baseWidth = 360;
  var baseHeight = 180;
  var scalingFactor = 3;
  var mapWidth = baseWidth * scalingFactor;
  var mapHeight = baseHeight * scalingFactor;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './public';
    loadFixtures('index.html');
  });

  it('has a title', function() {
    expect("title").toContainText('Mapify');
  });

  it('should initialize with a canvas', function() {
    expect(".mapCanvas").toExist();
  });

  // This is the WORST feature test for plotting tweets only TEST that they are different, can't download node-canvas, can't get image-diff to work, Ideally would like to paste the image here and test that they are equal. More googling needed. I have an images folder with the tweets jpg. If we can try to get the image data from there and test it would be GREAT!

  // THE PROBLEM IS THAT IT IS NOT CLICKING!!! move to root folder;


  // it('plot tweets changes the photo', function() {
  //   var mapContext = $(".mapCanvas")[0].getContext('2d');
  //   var data = mapContext.getImageData(0, 0, mapWidth, mapHeight);
  //   $('.plotTweets').click();
  //   expect('h1').toContainText("Potato");
  //   // var newData = mapContext.getImageData(0, 0, mapWidth, mapHeight);
  //   // expect(data).toEqual(newData);
  // });




});