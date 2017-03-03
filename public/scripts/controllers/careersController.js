myApp.controller("careersController", ['$scope', 'dbRoutesService', function($scope, dbRoutesService){
  console.log('In careersController');

  $scope.jobsArray = [];

  $scope.init = function(){
    $scope.getJobs();
  };


  $scope.getJobs = function(){
    dbRoutesService.getJobPostings()
    .then(function (jobPostingsFromDB){
      //success
      $scope.jobsArray = jobPostingsFromDB.data;
      console.log('jobsArray', $scope.jobsArray);
    }, function(errorObject){
      //err
    });
  };

  $scope.init();
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
