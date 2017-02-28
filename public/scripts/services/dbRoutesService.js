///////////////////////////////////This service is ONLY for database calls////////////////////////////////////////////
myApp.service('dbRoutesService', function(){
  console.log('in dbRoutesService');

  var jobPostingsFromDB = [];

  //test function in a service
  var testFunction = function(x) {
    z = x*2;
    console.log(z);
    return z;
  };

  ////////////////////Function: getJobPostings in DB///////////////////////
  var getJobPostings = function(){
    $.ajax({
      type: 'GET',
      url: '/getJobPostings',
      success: function(data){
        console.log('got this back from server:', data);
        jobPostingsFromDB = [];
        jobPostingsFromDB.push(data);
      }
    });
    return jobPostingsFromDB;
  };

  return {
    getJobPostings: getJobPostings,
    testFunction: testFunction
  };

});//end dbRoutesService
