var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());


app.get('/', function(request, response) {
var text = new Buffer(256);
text = fs.readFileSync('index.html');

var bftxt = buffer.toString('utf8 ',0,text.length);
resonse.send(bftxt);
//console.log(bftxt);


console.log(text);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
