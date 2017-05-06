const express = require('express');
const app = express();
const router = express.Router();  
const bodyParser = require('body-parser'); 
const sqlQuery = require('./sqlQuery');

try { // import the sensitive data from config.json
  global._conf = require('./config.json');
} catch(e) { console.log("config file NOT FOUND") };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router); // all of routes will be prefixed with /api

router.get('/', function(req, res) {
    res.json({ message: 'Hooray! API Works!' });
    console.log("/api GET.");
});

router.route('/coursesList')
  .post(function(req, res) {

  })
  .get(function(req, res){
      sqlQuery.getData(res, "");
  });

//"INSERT INTO KaiYi.dbo.testing (col1) VALUES ('2222')"
var server = app.listen(8008,function(){
 console.log('Server is running!');
});