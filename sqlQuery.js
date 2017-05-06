const sql = require('mssql');
// http://xuyuan923.github.io/2014/10/10/node-tutorial-req/
function getData(res, query) {

  
  return knex(_conf.sql_table).select().then((item)=>item);

  sql.connect(_conf.sql_connString, function (err) { // Connect to Database
    if(err) console.log(err);
    var request = new sql.Request(); //create Request object

    request.query('SELECT * FROM '+_conf.sql_table, function(err,recordset) {
      if(err) console.log(err);
      try {
        var numOfDatas = JSON.stringify(recordset.rowsAffected);
        console.log(numOfDatas, "data gets.");
        res.json({"dataSet": recordset.recordset}); //send records as a response
      } catch(e) {
        console.log("NO DATA");
        res.json({"message": "no data"});
      }
      sql.close(); // IMPORTANT!! Close the connection
    });

  });

}
module.exports.getData = getData;