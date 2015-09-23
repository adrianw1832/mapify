var sentimentCalculator = require('../public/js/sentimentCalculator');
var sentimentLookup = require('../public/word_library/library.js');

describe("sentimentCalculator", function () {
  it('returns 2 when tweet contains two positive words e.g. happy and fun', function() {
    expect(sentimentCalculator.calculate(mockVeryPositiveTweet)).toEqual(2);
  });

  it('returns 1 when tweet contains one positive words e.g. amused', function() {
    expect(sentimentCalculator.calculate(mockPositiveTweet)).toEqual(1);
  });

  it('returns 0 when tweet contains no positive or negative words', function() {
    expect(sentimentCalculator.calculate(mockNeutralTweet)).toEqual(0);
  });

  it('returns -1 when tweet contains one negative words e.g. abnormal', function() {
    expect(sentimentCalculator.calculate(mockNegativeTweet)).toEqual(-1);
  });

  it('returns -2 when tweet contains two negative words e.g. sad and depressing', function() {
    expect(sentimentCalculator.calculate(mockVeryNegativeTweet)).toEqual(-2);
  });
});
