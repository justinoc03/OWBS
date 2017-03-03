///////////////////////////////////This service is ONLY for database calls////////////////////////////////////////////
myApp.service('dbRoutesService', ['$http','$q', '$rootScope', function($http, $q, $rootScope){
  console.log('in dbRoutesService');

  var dbRoutesService = this;
  var jobPostingsFromDB = [];


  ////////////////////Function: getJobPostings in DB///////////////////////
  dbRoutesService.getJobPostings = function(){
    $http({
      type: 'GET',
      url: '/getJobPostings'
    }).then(function success(responseObject){
        console.log('got this back from server:', responseObject);
        jobPostingsFromDB = responseObject.data;
      }, function error(errorObject){
        console.log(errorObject);
      });
      return jobPostingsFromDB;
  };


}]);//end dbRoutesService
