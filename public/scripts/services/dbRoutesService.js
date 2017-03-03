///////////////////////////////////This service is ONLY for database calls////////////////////////////////////////////
myApp.service('dbRoutesService', ['$http','$q', '$rootScope', function($http, $q, $rootScope){
  console.log('in dbRoutesService');

  var dbRoutesService = this;
  var jobPostingsFromDB = [];

  //test function in a service
  // var testFunction = function(x) {
  //   z = x*2;
  //   console.log(z);
  //   return z;
  // };

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

  // return {
  //   getJobPostings: getJobPostings,
  //   // testFunction: testFunction
  // };

}]);//end dbRoutesService
