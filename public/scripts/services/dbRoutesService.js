///////////////////////////////////This service is ONLY for database calls////////////////////////////////////////////
myApp.service('dbRoutesService', ['$http','$q', '$rootScope', function($http, $q, $rootScope){
  console.log('in dbRoutesService');

  var jobPostingsFromDB = [];

  //test function in a service
  // var testFunction = function(x) {
  //   z = x*2;
  //   console.log(z);
  //   return z;
  // };

  ////////////////////Function: getJobPostings in DB///////////////////////
  var getJobPostings = function(){
    $http({
      type: 'GET',
      url: '/getJobPostings'
    }).then(function success(responseObject){
        console.log('got this back from server:', responseObject);
        jobPostingsFromDB = responseObject.data;
      }, function error(errorObject){
        console.log(errorObject);
      });
  };

  return {
    getJobPostings: getJobPostings,
    // testFunction: testFunction
  };

}]);//end dbRoutesService

// $scope.getItems = function () {
//   console.log('in getItems');
//   $http({
//     method: 'GET',
//     url: '/getItems'
//   }).then(function success(responseObject) {
//     console.log('got these items from server/db:', responseObject);
//     $scope.allItemsInStash = responseObject.data;
//   }, function error(errorObject){
//     console.log(errorObject);
//   });
//   // console.log($scope.allItemsInStash);
// };
