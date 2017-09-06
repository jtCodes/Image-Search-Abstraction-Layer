var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

const url = 'http://www.bing.com/images/search?q=';

/* GET users listing. */
router.get('/', function (req, res, next) {
  var request = require('request');
  var q = req.query.q;
  var offset = '&first=' + req.query.offset + '&count=28&FORM=IBASEP';
  console.log(req.query.offset);
  request( url + q + offset, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const db = require('../db/database.js');
      const text = 'INSERT INTO history(input,timest) VALUES($1,$2)';
      const values = [q , moment()];    
      var $ = cheerio.load(body);
      var json = [];
      
      db.query(text, values, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
            console.log("success");
        }
      })

      var test = $('#b_content #canvas #main .content').find('.row .item').each(function (index, element) {
        var des = $(element).find('.meta .des').text();
        var title = $(element).find('.meta .tit').attr('href');
        var source =  $(element).find('.thumb').attr('href');
        var thumb = $(element).find('.thumb .cico img').attr('src');
        var single = { 'description': des , 'title': title , 'source' : source, 'thumbnail' : thumb};
        json.push(single);
      });
      res.send(json);
    }
  })
});

module.exports = router;
