var http = require('http');
var fs = require('fs');
const url = require('url');
const path = require('path');

var message = 'I am so happy to be part of the Node Girls workshop!';

function handler(request, response) {
console.log('hello');
//debugger;
var endpoint='/';
if (endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.end(file);
    });
} else if (endpoint === '/node') {

    //...
} else if (endpoint === '/girls') {

    //...
} else {

    // TODO - write your generic endpoint code here
}
}


//var server = http.createServer();
var server = http.createServer(handler);
server.listen(3000, function () {
	//var method = request.method;
console.log("request:"+server.request);
    console.log("Server is listening on port 3000. Ready to accept requests!");
});