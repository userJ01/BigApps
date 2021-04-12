var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bigapps"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM category", function (err, result, fields) {
      if (err) throw err;
      console.log(fields);
      console.log(result);
    });
  });
con.getResultBySqlQuery=function(sqlQuery=string)
{
  con.connect(sqlQuery,function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sqlQuery, function (err, result,fields) {
        if (err) throw err;
        console.log("Result: " + result);
      });
  });
};

  var DbHelper={
    getResultBySqlQuery:function(sqlQuery=string)
    {
      con.connect(sqlQuery,function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(sqlQuery, function (err, result,fields) {
            if (err) throw err;
            console.log("Result: " + result);
          });
      });
    }
  };
    
/*
con.connect(sqlQuery,function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
  });

*/