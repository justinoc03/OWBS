//////////////////////General Server Startup/////////////////////////////////////////
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bodyParserJson = bodyParser.json();

var urlencodedParser =  bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 9000;

app.use(bodyParserJson);
app.use(urlencodedParser);

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});

// use public
app.use(express.static('public'));



//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
