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

  ////////////////////Function PUT Route: modifyJobPosting in DB///////////////////////
  dbRoutesService.modifyJobStatus = function(jobToModify){
    console.log('in dbRoutesService modify:', jobToModify );
    //dependency $q is used for promises when working with Async data from a database
    var defer = $q.defer();

    console.log('objectToSend', jobToModify);

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


}]);//end dbRoutesService
