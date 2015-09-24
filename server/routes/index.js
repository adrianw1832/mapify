var express = require('express');
var app = express();
var router = express.Router();
var tweetsDatabase = require('../models/tweet.js');

router.get('/', function(req, res) {
  res.sendFile('/index.html');
});

router.get('/tweets', queryCoords);

function queryCoords(req, res) {
  tweetsDatabase.find(function(err, coords) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      res.json(coords);
    }
  });
};

module.exports = router;
