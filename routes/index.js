var express = require('express');
var router = express.Router();
var data = require("../model/db").default;

/* GET home page. */
router.get('/', function(req, res, next) {
  Promise.all([
    data.get_courses()
  ]).then(([articles])=>{
    if(articles.length == 0) return next();

    res.render('index', { 
      title: '元智修課資訊系統',
      articles
    });

  })
});

module.exports = router;
