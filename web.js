var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
var text = '';

app.get('/', function(request, response) {

text = fs.readFileSync('index.html');
var buffer = new Buffer(256);
var bftxt = buffer.toString('utf8 ',0,text.length);
resonse.send(bftxt);
//console.log(bftxt);


console.log(text);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
