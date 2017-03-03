///////////////////////////////////This service is ONLY for database calls////////////////////////////////////////////
myApp.service('dbRoutesService', ['$http','$q', function($http, $q){
  console.log('in dbRoutesService');

  var dbRoutesService = this;
  var jobPostingsFromDB = [];


  ////////////////////Function: getJobPostings in DB///////////////////////
  dbRoutesService.getJobPostings = function(){
    var defer = $q.defer();


    $http({
      type: 'GET',
      url: '/getJobPostings'
    }).then(function success(responseObject){
        jobPostingsFromDB = responseObject;
        defer.resolve(responseObject);
      }, function error(errorObject, status){
        console.log(errorObject);
        defer.reject(errorObject);
      });
      return defer.promise;
  };


}]);//end dbRoutesService
