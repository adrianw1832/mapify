var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet');


router.get('/', function (req, res) {
  res.render('index');
});
