const sql = require('mssql');

function getData(res, query) {

  sql.connect(__conf.sql_connString, function (err) { // Connect to Database
    if(err) console.log(err);
    var request = new sql.Request(); //create Request object

    request.query('SELECT * FROM '+__conf.sql_dbName, function(err,recordset) {
      if(err) console.log(err);
      var numOfDatas = JSON.stringify(recordset.rowsAffected);
      console.log(numOfDatas, "data gets.");
      res.json({"datas": recordset.recordsets}); //send records as a response
      sql.close(); // IMPORTANT!! Close the connection
    });

  });
}
module.exports.getData = getData;