//////////////////////General Server Startup/////////////////////////////////////////
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bodyParserJson = bodyParser.json();

var urlencodedParser =  bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 9000;


if(process.env.DATABASE_URL !== undefined) {
    console.log('env connection string');
    connectionString = process.env.DATABASE_URL;
    pg.defaults.ssl = true;
} else {
    connectionString = 'postgres://localhost:5432/OWBS';
}

// use public,bodyParserJson,urlencodedParser
app.use(express.static('public'));
app.use(bodyParserJson);
app.use(urlencodedParser);

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});




//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
