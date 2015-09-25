colourGeneratorObject = require('../public/js/colourGenerator');
colourGenerator = new colourGeneratorObject();

describe("colourGenerator", function () {
  it('returns green when the sentiment value is above 0', function() {
    expect(colourGenerator.generate(2)).toEqual('#18bd4a');
  });

  it('returns yellow when the sentiment value is 0', function() {
    expect(colourGenerator.generate(0)).toEqual('#e6cc68');
  });

  it('returns red when the sentiment value is below 0', function() {
    expect(colourGenerator.generate(-2)).toEqual('#cd3f45');
  });
})
