var express = require('express');
var app = express();

app.use(express.static('public'))

//const indexRouter = require("./index.html");


var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '',  
  database : 'bigapps'  
});        

app.get('/rows', function (req, res) {
  connection.connect();  

  connection.query('SELECT * FROM users', function(err, rows, fields)   
  {  
      connection.end();
      if (err) throw err;  
      
      //app.use(express.static(__dirname + "/app"));
      res.json(rows); 

  });
});

/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/