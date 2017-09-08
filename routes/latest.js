var express = require('express');
var router = express.Router();
var moment = require('moment');
/* GET home page. */
router.get('/', function(req, res, next) {
  const db = require('../db/database.js');
  const text = 'SELECT * FROM history ORDER BY timest DESC LIMIT 10';
  var json = [];

  db.query(text, (err, result) => {
    for (var i = 0 ; i< result.rowCount; i++) {
      var timestamp = result.rows[i].timest;
      json.push ({ 'input': result.rows[i].input , 'time': timestamp });
    }
    res.send(json);
  })
});

module.exports = router;
