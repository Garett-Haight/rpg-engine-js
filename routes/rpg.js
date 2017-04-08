var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rpg', { title: 'Don\'t get ye stabbed' });
});

module.exports = router;
