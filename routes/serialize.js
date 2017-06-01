var express = require('express');
var router = express.Router()
var app = express();

var JSONS = require('json-serialize');;
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));




router.get('/', function(req, res, next) {
  res.render('serialize', { title: 'JSON Serializer' });
});

router.post('/', function(req, res, next) {
    res.setHeader('Content-Type', 'plain/text');
    res.status(200);
    res.status(200).send(JSON.stringify(req.body.json));
});


module.exports = router;
