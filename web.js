var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());

//RAHUL MEHTA
app.get('/', function(request, response) {
var text = new Buffer(256);
text = fs.readFileSync('index.html','utf8');

var bftxt = text.toString('utf8 ',0,text.length);
response.send(bftxt);
//console.log(bftxt);


console.log(text);
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
