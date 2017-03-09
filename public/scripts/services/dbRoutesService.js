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

  ////////////////////Function PUT Route: newJobPosting in DB///////////////////////
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
  dbRoutesService.modifyJobStatus = function(jobToModify){
    console.log('in dbRoutesService modify:', jobToModify );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    $http({
      method: 'PUT',
      url: '/modifyJobStatus',
      data: jobToModify
    }).then(function success(responseObject){
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log('there was an error modifying info in the DB', errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };

  ////////////////////Function PUT Route: deleteJobPosting in DB///////////////////////
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


}]);//end dbRoutesService
