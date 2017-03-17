//////////////////////General Server Startup/////////////////////////////////////////
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bpJason = bodyParser.json({limit: '50mb'});
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true} );
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
app.use(bpJason);
app.use(urlencodedParser);

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});//End: General Server Startup

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var helper = require('sendgrid').mail;

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


////////////////////////////////////////////////////////////////// POST ROUTES //////////////////////////////////////////////////////////////////////////////
/////////////////////POST Route: newJobPosting in DB///////////////////////////
app.post('/newJobPosting', function(req, res){
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

////////////////////////////////////////////////////////////////// PUT ROUTES //////////////////////////////////////////////////////////////////////////////
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

/////////////////////Put Route: modifyJobStatus in DB///////////////////////////
app.put('/checkCredentials', function(req, res){
  console.log('in checkCredentials route req.body', req.body);

    var userName = req.body.userName;
    var userPassword = req.body.userPassword;

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{

      // //array to hold results
      var responseFromDB = [];

      var queryResults = client.query('SELECT * FROM adminLogin WHERE admin_username = ($1) AND admin_password = ($2)', [userName, userPassword]);

      // var queryResults = client.query('SELECT admin_username FROM adminLogin;');
      queryResults.on('row', function(row){
        responseFromDB.push(row);
        // responseFromDB = 'Successful Login';
        if(responseFromDB.length === 1){
          responseFromDB = 'AWESOME';
        }
      });
      queryResults.on('end', function(){
        done();
        return res.json(responseFromDB);
      }); // end queryResults
    } //end else
  }); //end pg.connect
}); //end getJobPostings
//.................End Put Route: modifyJobStatus in DB.......................//


////////////////////////////////////////////////////////////////// DELETE ROUTES //////////////////////////////////////////////////////////////////////////////
/////////////////////Put Route: deleteJob in DB///////////////////////////
app.delete('/deleteJob', function(req, res){
  console.log('in deleteJob route req.body', req.query.q);

    var jobPostingID = req.query.q;

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{

      //array to hold results
      var newJobPostingsArray = [];

      client.query('DELETE FROM jobpostings WHERE jobposting_id = ($1)', [jobPostingID]);

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
//.................End Put Route: deleteJob in DB.......................//

/////////////////////POST Route: newJobPosting in DB///////////////////////////
app.post('/testEmail', function(req, res){
  console.log('in testEmail route req.body', req.body);

  var applicantFirstName = req.body.applicantFirstName;
  var applicantLastName = req.body.applicantLastName;
  var applicantEmail = req.body.applicantEmail;
  var applicantPhone = req.body.applicantPhone;
  var commentsQuestions = req.body.commentsQuestions;
  var jobPostingTitle = req.body.jobPostingTitle;
  var fileName = req.body.fileName;
  var fileType = req.body.fileType;
  var base64File = req.body.base64File;

  console.log(applicantFirstName);
  console.log(applicantLastName);
  console.log(applicantEmail);
  console.log(applicantPhone);
  console.log(commentsQuestions);
  console.log(jobPostingTitle);
  console.log(fileName);
  console.log(fileType);
  console.log(base64File);

  var from_email = new helper.Email(applicantEmail);
  var to_email = new helper.Email("oconnor.justin.r@gmail.com");
  var subject =  jobPostingTitle + " Application Received from: " + applicantFirstName + " " + applicantLastName;
  var content = new helper.Content("text/html", "<h3><strong>Position:</strong></h3> " + jobPostingTitle + "<br><h3><strong>Applicant Information:</strong></h3> " + "Name: " + applicantFirstName + " " + applicantLastName + "<br> Applicant Email: " + applicantEmail + "<br> Applicant Phone: " + applicantPhone + "<br><br><h3><strong>Comments/Questions:</strong></h3> " + "<blockquote>" + commentsQuestions + '</blockquote>');

  attachment = new helper.Attachment();
  attachment.setContent(base64File);
  attachment.setType(fileType);
  attachment.setFilename(fileName);
  attachment.setDisposition("attachment");

  var mail = new helper.Mail(from_email, subject, to_email, content);
  mail.addAttachment(attachment);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log('response statusCode', response.statusCode);
    console.log('response body', response.body);
    console.log('response headers', response.headers);
  });
  // done();
  // return res.json(responseObject);
}); //end getJobPostings
//.................End Put Route: modifyJobStatus in DB.......................//



//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
//......................End: generic app.get..................................//
