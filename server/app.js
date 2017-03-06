//////////////////////General Server Startup/////////////////////////////////////////
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bpJason = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 9000;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/OWBS';

if(process.env.DATABASE_URL !== undefined) {
    console.log('env connection string');
    connectionString = process.env.DATABASE_URL;
    pg.defaults.ssl = true;
} else {
    connectionString = 'postgres://localhost:5432/OWBS';
}

// use public,bodyParserJson,urlencodedParser
app.use(express.static('public'));
app.use(urlencodedParser);
app.use(bpJason);

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});//End: General Server Startup


////////////////////////////////////////////////////////////////// GET ROUTES //////////////////////////////////////////////////////////////////////////////
/////////////////////Get Route: getJobPostings in DB///////////////////////////
app.get('/getJobPostings', function(req, res){
  console.log('in getJobPostings route');

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{
      console.log('connected via getJobPostings');
      var existingJobPostingsArray = [];
      var queryResults = client.query('select * FROM jobPostings ORDER BY lower(jobposting_name);');
      queryResults.on('row', function(row){
        existingJobPostingsArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(existingJobPostingsArray);
      }); // end queryResults
    } //end else
  }); //end pg.connect
}); //end getJobPostings
//.................End Get Route: getJobPostings in DB.......................//


////////////////////////////////////////////////////////////////// PUT ROUTES //////////////////////////////////////////////////////////////////////////////
/////////////////////Put Route: modifyJobStatus in DB///////////////////////////
app.put('/newJobPosting', function(req, res){
  console.log('in newJobPosting route req.body', req.body);

    var jobPostingName = req.body.jobPostingName;
    var jobPostingDescription = req.body.jobPostingDescription;
    var jobPostingOpen = req.body.jobPostingOpen;
    var jobPostingStart = 'now()';

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{

      //array to hold results
      var newJobPostingsArray = [];

      client.query('INSERT INTO jobpostings (jobposting_name, jobposting_description, jobposting_open, jobposting_start) VALUES ($1, $2, $3, $4);', [jobPostingName, jobPostingDescription, jobPostingOpen, jobPostingStart]);

      var queryResults = client.query('select * FROM jobPostings ORDER BY lower(jobposting_name);');
      queryResults.on('row', function(row){
        newJobPostingsArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(newJobPostingsArray);
      }); // end queryResults
    } //end else
  }); //end pg.connect
}); //end getJobPostings
//.................End Put Route: modifyJobStatus in DB.......................//

/////////////////////Put Route: modifyJobStatus in DB///////////////////////////
app.put('/modifyJobStatus', function(req, res){
  console.log('in modifyJobStatus route req.body', req.body);

    var jobPostingID = req.body.jobPostingID;
    var jobPostingName = req.body.jobPostingName;
    var jobPostingDescription = req.body.jobPostingDescription;
    var jobPostingOpen = req.body.jobPostingOpen;
    var jobPostingStart = req.body.jobPostingStart;

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{

      //array to hold results
      var newJobPostingsArray = [];

      client.query('UPDATE jobpostings SET jobposting_name = ($1), jobposting_description = ($2), jobposting_open = ($3), jobPosting_start = ($4) WHERE jobposting_id = ($5)', [jobPostingName, jobPostingDescription, jobPostingOpen, jobPostingStart, jobPostingID]);

      var queryResults = client.query('select * FROM jobPostings ORDER BY lower(jobposting_name);');
      queryResults.on('row', function(row){
        newJobPostingsArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(newJobPostingsArray);
      }); // end queryResults
    } //end else
  }); //end pg.connect
}); //end getJobPostings
//.................End Put Route: modifyJobStatus in DB.......................//


//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
//......................End: generic app.get..................................//
