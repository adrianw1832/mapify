
var generate = function(sentimentValue) {
  if (sentimentValue === 0) return '#e6cc68';
  if (sentimentValue > 0) return '#18bd4a';
  if (sentimentValue < 0) return '#cd3f45';
};

module.exports = generate;
