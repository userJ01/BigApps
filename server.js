var http = require('http');
var fs = require('fs');
const url = require('url');
const path = require('path');

var express = require('express');
var app = express();
/**For upload image or file */
var formidable = require('formidable');
/**MySql */
var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost', 
  user     : 'root',  
  password : '',  
  database : 'bigapps'  
}); 
/**public path(folder) */
var dir = path.join(__dirname, 'public');
/**mime types */
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    ico: 'image/ico',
    apng: 'image/apng',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var server = http.createServer(handler);
server.listen(3000, function () {
    console.log("http://localhost:3000. Ready to accept requests!");
});

function handler(request, response) {
 var reqpath = request.url.toString().split('?')[0];
 var mime_file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
 var reqpath = request.url.toString().split('?')[0];
 var type = mime[path.extname(mime_file).slice(1)] || 'text/plain';
 //console.log('request Type:',type);
var x_id=request.headers['x-id'];
var x_method=request.headers['x-method'];
    var q ='';
    try {
        q=url.parse(request.url, true).query;
    } catch (error) {
        q='';
    } 

    /** */
    connection = mysql.createConnection({  
      host     : 'localhost', 
      user     : 'root',  
      password : '',  
      database : 'bigapps'  
    }); 
    /** */
    var isApi=0;
    /** */
    var endpoint=request.url;
    /** */
    isApi=endpoint.indexOf('api');
    /**For index page */
    if (endpoint === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
    
        fs.readFile(__dirname + '/app/index.html', function(error, file) {
          if (error) {
            console.log(error);
            return;
          }
          response.end(file);
        });
    } 
    /**For login pafe */
    else if (endpoint === '/login') {
      response.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile(__dirname + '/app/login.html', function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        response.end(file);
      });
    }
    /**Disply all products */
    else if (endpoint === '/manage/products') {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile(__dirname + '/app/products.html', function(error, file) {
          if (error) {
            console.log(error);
            return;
          }
          response.end(file);
        });
    }
    /**Disply all products */
    else if (endpoint.indexOf('manage/product.html?id=')>0) {
      response.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile(__dirname + '/app/product.html', function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        response.end(file);
      });
  }
    /**Display all Orders */
    else if (endpoint === '/manage/orders') {
      response.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile(__dirname + '/app/manage.html', function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        response.end(file);
      });
  }
  /**Display All Categories */
    else if (endpoint === '/manage/categories') {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile(__dirname + '/app/categories.html', function(error, file) {
          if (error) {
            console.log(error);
            return;
          }
          response.end(file);
        });
    }
    /**Created Item Cat and Ulpoad image */
    else if (endpoint === '/fileupload') {
      var form = new formidable.IncomingForm();
      form.uploadDir = (__dirname +'/public/upload/');       //set upload directory
      form.keepExtensions = true;     //keep file extension
      form.parse(request, function (err, fields, files) {
        var t=JSON.stringify(files).split('":{')[1].replace('}','').replace('"size"','{"size"');
        var temp_file=JSON.parse(t);
        var oldpath = temp_file.path;//files.filetoupload.path;
        var newpath = (__dirname +'/public/upload/' + temp_file.name);
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
            connection = mysql.createConnection({  host: 'localhost', user: 'root', password : '',  database : 'bigapps' }); 
            connection.connect(function(err){
            var curdate=Date();
            var curdeleteddate=new Date('0000');
              var sql = "insert into category (title,picture,enable,created,updated,deleted) values (";
              sql += "'"+fields.name+"','/upload/"+temp_file.name+"','"+fields.enabled+"','"+curdate+"','"+curdate+"','"+curdeleteddate+"'";
              sql += ")";
              connection.query(sql, function (err, result) {
                if (err) {
                  response.writeHead(200, {"Content-Type": "application/json"},);
                  response.write(JSON.stringify({status:false,err}));
                  response.end();
                }
                console.log("1 record inserted");
              });
            });  
            response.writeHead(200, {"Content-Type": "application/json"},);
            response.write(JSON.stringify({status:true}));
            response.end();
        });
   });

  }
  //   else if (endpoint === '/manage/new_categories') {
  //     response.writeHead(200, {"Content-Type": "text/html"});
  //     fs.readFile(__dirname + '/app/categories.html', function(error, file) {
  //       if (error) {
  //         console.log(error);
  //         return;
  //       }
  //       response.end(file);
  //     });
  // }

  /** +API+ */
    else if (isApi==1 && q.method==='getcategories') {
        connection = mysql.createConnection({  host     : 'localhost', user     : 'root', password : '',  database : 'bigapps' }); 
        connection.connect();  
        connection.query('SELECT * FROM category', function(err, rows, fields)   
        {  
            connection.end();
            if (err) throw err;  
            response.writeHead(200, {"Content-Type": "application/json"},);
            response.write(JSON.stringify(rows)); 
            response.end();
        });
    } 
    else if (isApi==1 && q.method==='getproducts') {
      connection = mysql.createConnection({  host     : 'localhost', user     : 'root', password : '',  database : 'bigapps' }); 
      connection.connect();  
      connection.query('SELECT * FROM product', function(err, rows, fields)   
      {  
          connection.end();
          if (err) throw err;  
          response.writeHead(200, {"Content-Type": "application/json"},);
          response.write(JSON.stringify(rows)); 
          response.end();
      });
  } 
  /**Files */
   else if(type!='text/plain'){
    fs.readFile(mime_file, function(error, file) {
      if (error) {
        console.log(error);
        response.writeHead(404, {"Content-Type": "text/plain"});
        return;
      }
      response.writeHead(200, {"Content-Type": type});
      response.end(file);
    });
   }
   /** */
  else {
    
        // TODO - write your generic endpoint code here
    }
    /**/
}

