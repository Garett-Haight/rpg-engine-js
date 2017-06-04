var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST || 'localhost',
    user: process.env.MYSQLCS_USER_NAME || 'game_user',
    password: process.env.MYSQLCS_USER_PASSWORD || 'game_user541#',
    database: process.env.DB || 'game_data',
    debug: false
});

/* GET map data. */
console.log("map");
router.get('/', function(req, res, next){
    res.status(400).json({error: "No map id provided"});
});

router.get('/:id', function(req, res, next) {
    var data = null;
    pool.getConnection(function(err, connection) {
        if (err) {
            res.json({"code" : 100, "status" : err});
            return;
        }

        connection.query('SELECT CONVERT(map USING utf8) from game_data.map_data WHERE id="' + req.params.id + '";', function(err, rows, fields) {
            connection.release();
            if (!err && rows.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(JSON.parse(rows[0][Object.keys(rows[0])[0]]));
            }
            else {
                res.status(500).json({error: "Something went wrong while fetching data"});
            }
        });

        connection.on('error', function(err) {
            res.json({"code": 100, "status" : err});
        });
    });
});

module.exports = router;
