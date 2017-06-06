var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

/* GET map data. */
router.get('/', function(req, res, next){
    res.status(400).json({error: "No map id provided"});
});

router.get('/:id', function(req, res, next) {
    MongoClient.connect("mongodb://"+process.env.MONGO_PORT_27017_TCP_ADDR+"/game_data", function(err, db){
        if (err) {
            res.json({"status" : err});
            return;
        }
        var collection = db.collection("maps");
        var stream = collection.find({"_id": parseInt(req.params.id)}).stream();
        stream.on("data", function(item){
            res.json(item);
        });

        stream.on("end", function(){

        });
    });
});

module.exports = router;
