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


// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var helper = require('sendgrid').mail;


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

  var applicantName = req.body.applicantName;
  var applicantEmail = req.body.applicantEmail;
  var fileToSend = req.body.base64File;

  var from_email = new helper.Email(applicantEmail);
  var to_email = new helper.Email("oconnor.justin.r@gmail.com");
  var subject = "Application from: " + applicantName;
  var content = new helper.Content("text/plain", "Hello! My name is " + applicantName + ". My application is attached to this email. Thank you!");

  attachment = new helper.Attachment();
  attachment.setContent('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6Pv1jpBTDSl6Juytq6p0XOEM+fgJlPRNp8/KslZf/puFglO59tUG323whYM6BoZ61mxY1Tmxd3ry0PS/Ae6cqCIKZW5kc3RyZWFtCmVuZG9iagoxNyAwIG9iagoyNzIxCmVuZG9iagoxOCAwIG9iagooTWljcm9zb2Z0IFdvcmQgLSBEb2N1bWVudDEpCmVuZG9iagoxOSAwIG9iagooTWFjIE9TIFggMTAuMTEuNiBRdWFydHogUERGQ29udGV4dCkKZW5kb2JqCjIwIDAgb2JqCihXb3JkKQplbmRvYmoKMjEgMCBvYmoKKEQ6MjAxNzAzMTcxNzMyMDJaMDAnMDAnKQplbmRvYmoKMjIgMCBvYmoKKCkKZW5kb2JqCjIzIDAgb2JqClsgXQplbmRvYmoKMSAwIG9iago8PCAvVGl0bGUgMTggMCBSIC9Qcm9kdWNlciAxOSAwIFIgL0NyZWF0b3IgMjAgMCBSIC9DcmVhdGlvbkRhdGUgMjEgMCBSIC9Nb2REYXRlCjIxIDAgUiAvS2V5d29yZHMgMjIgMCBSIC9BQVBMOktleXdvcmRzIDIzIDAgUiA+PgplbmRvYmoKeHJlZgowIDI0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwNzUwNiAwMDAwMCBuIAowMDAwMDAwNDM1IDAwMDAwIG4gCjAwMDAwMDM0MDggMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDAwNDE2IDAwMDAwIG4gCjAwMDAwMDA1MzkgMDAwMDAgbiAKMDAwMDAwMzM3MiAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMDM1NDEgMDAwMDAgbiAKMDAwMDAwMDYzNiAwMDAwMCBuIAowMDAwMDAzMzUxIDAwMDAwIG4gCjAwMDAwMDM0OTEgMDAwMDAgbiAKMDAwMDAwNDIzNiAwMDAwMCBuIAowMDAwMDAzNzg3IDAwMDAwIG4gCjAwMDAwMDQyMTYgMDAwMDAgbiAKMDAwMDAwNDQ3MiAwMDAwMCBuIAowMDAwMDA3MjgzIDAwMDAwIG4gCjAwMDAwMDczMDQgMDAwMDAgbiAKMDAwMDAwNzM0OSAwMDAwMCBuIAowMDAwMDA3NDAyIDAwMDAwIG4gCjAwMDAwMDc0MjUgMDAwMDAgbiAKMDAwMDAwNzQ2NyAwMDAwMCBuIAowMDAwMDA3NDg2IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgMjQgL1Jvb3QgMTIgMCBSIC9JbmZvIDEgMCBSIC9JRCBbIDxhZjg2MjIyN2U4NTFkZmU5MmRhNDU4MTE2YzgwMDg0Yz4KPGFmODYyMjI3ZTg1MWRmZTkyZGE0NTgxMTZjODAwODRjPiBdID4+CnN0YXJ0eHJlZgo3NjUwCiUlRU9GCg==');
  attachment.setType("application/pdf");
  attachment.setFilename("testResume.pdf");
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

}); //end getJobPostings
//.................End Put Route: modifyJobStatus in DB.......................//



//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
//......................End: generic app.get..................................//
