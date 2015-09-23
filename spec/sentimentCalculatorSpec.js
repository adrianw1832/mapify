var sentimentCalculator = require('../public/js/sentimentCalculator');
var sentimentLookup = require('../public/word_library/library.js');

describe("sentimentCalculator", function () {
  it('returns 2 when tweet contains two positive words e.g. happy and fun', function() {
    expect(sentimentCalculator.calculate(mockVeryPositiveTweet)).toEqual(2);
  });
});
