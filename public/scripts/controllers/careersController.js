myApp.controller("careersController", ['$scope', 'dbRoutesService', function($scope, dbRoutesService){
  console.log('In careersController');
  $scope.jobsArray = [];

  // dbRoutesService.testFunction(25);
  jobsArray = dbRoutesService.getJobPostings();
  console.log(jobsArray);

  $scope.getJobs = function(){
    jobsArray = dbRoutesService.getJobPostings();
    console.log(jobsArray);
  };


  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
