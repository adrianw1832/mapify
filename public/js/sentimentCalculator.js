var library = require('../word_library/library');
var score;

exports.calculate = function(tweetArray) {
  score = 0;
  _lookupLibrary(tweetArray);
  return score;
};

function _lookupLibrary(tweetArray) {
  for (var i = 0; i < tweetArray.length; i++) {
    var word = tweetArray[i];
    if (library.sentimentLookup[word]) score += library.sentimentLookup[word];
  }
}
