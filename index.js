try { // import the sensitive data from config.json
  global._conf = require('./config.json');
} catch(e) { console.log("config file NOT FOUND"); };

const epilogue = require('epilogue');
const http = require('http');

// Initialize server
var server, app;
if (process.env.USE_RESTIFY) {
  var restify = require('restify');

  app = server = restify.createServer();
  app.use(restify.queryParser());
  app.use(restify.bodyParser());
} else {
  var express = require('express'),
      bodyParser = require('body-parser');

  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  server = http.createServer(app);
};

// Define models
const Sequelize = require('sequelize');
const db = new Sequelize(_conf.sql_db, _conf.sql_user, _conf.sql_pwd, {
  host: _conf.sql_server,
  dialect: 'mssql'
});
const testingDB = db.define("Kai", {
  col1: Sequelize.INTEGER,
  col2: Sequelize.CHAR(4)
},{
  freezeTableName: true,
  timestamps: false,
})
const Product = db.define("PRODUCT", {
  P_CODE: Sequelize.CHAR(10),
  P_DESCRIPT: Sequelize.CHAR(35),
  P_INDATE: Sequelize.DATE,
  P_QOH: Sequelize.INTEGER,
  P_MIN: Sequelize.INTEGER,
  P_PRICE: Sequelize.DECIMAL(8,2),
  P_DISCOUNT: Sequelize.DECIMAL(5,2),
  V_CODE: Sequelize.INTEGER
});

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: db
});

// Create REST resource
var testing = epilogue.resource({
  model: testingDB,
  endpoints: ['/testing', '/testing/:id'],
  search: 
    {
      param: 'testingId',
      attributes: ['id']
    }
});

// Create database and listen
db
  .sync({ force: false })
  .then(function() {
    server.listen(8008, function() {
    console.log('listening');
    });
  });
