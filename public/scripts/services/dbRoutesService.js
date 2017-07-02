///////////////////////////////////This service is ONLY for database calls////////////////////////////////////////////
myApp.service('dbRoutesService', ['$http','$q'  , function($http, $q){
  console.log('in dbRoutesService');

  var dbRoutesService = this;
  var jobPostingsFromDB = [];


  ////////////////////Function GET Route: getJobPostings from DB ///////////////////////
  dbRoutesService.getJobPostings = function(){
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'GET',
      url: '/getJobPostings'
    }).then(function success(responseObject){
        jobPostingsFromDB = responseObject;
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error retreiving info from the DB', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////////////Function POST Route: newJobPosting in DB///////////////////////
  dbRoutesService.newJobPosting = function(newJobToPost){
    console.log('in dbRoutesService newJobPosting:', newJobToPost );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'POST',
      url: '/newJobPosting',
      data: newJobToPost
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error modifying info in the DB', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////////////Function PUT Route: modifyJobPosting in DB///////////////////////
  dbRoutesService.modifyJobPosting = function(jobToModify){
    console.log('in dbRoutesService modify:', jobToModify );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'PUT',
      url: '/modifyJobPosting',
      data: jobToModify
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error modifying info in the DB', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////////////Function DELETE Route: deleteJobPosting in DB///////////////////////
  dbRoutesService.deleteJob = function(jobToDelete){
    console.log('in dbRoutesService delete:', jobToDelete.jobPostingID );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'DELETE',
      url: '/deleteJob?q=' + jobToDelete.jobPostingID,
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error modifying info in the DB', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////////////Function PUT Route: deleteJobPosting in DB///////////////////////
  dbRoutesService.adminLoginRoute = function(loginInfoToSend){
    console.log('in adminLoginRoute:', loginInfoToSend );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'PUT',
      url: '/checkCredentials',
      data: loginInfoToSend
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error verifying login info', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////Function POST Route: sendgrid API for job applications sent via email//////////
  dbRoutesService.emailJobApplication = function(emailInfoToOWBS){
    console.log('in dbRoutesService emailJobApplication:', emailInfoToOWBS );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'POST',
      url: '/emailApplicationSendgrid',
      data: emailInfoToOWBS
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error sending the email to Sendgrid', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////Function POST Route: sendgrid API for contactUs page info via email//////////
  dbRoutesService.contactInfoToSend = function(contactInfo){
    console.log('in dbRoutesService contactInfo:', contactInfo );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    //Route to OWBS
    $http({
      method: 'POST',
      url: '/emailContactUsInfoSendgrid',
      data: contactInfo
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error sending the email to Sendgrid', errorObject);
        defer.reject(errorObject);
      });
      // return defer.promise;

    //Route to send confirmation email to sender
    $http({
      method: 'POST',
      url: '/emailContactUsInfoSendgrid_User',
      data: contactInfo
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error sending the email to Sendgrid', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;

  };

}]);//end dbRoutesService
