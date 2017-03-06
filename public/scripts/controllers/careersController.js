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

  $scope.clickedJobPosting = function(job){

    jobToModify = {
      jobPostingID: job.jobposting_id,
      jobPostingName: job.jobposting_name,
      jobPostingDescription: job.jobposting_description,
      jobPostingOpen: job.jobposting_open,
      jobPostingStart: job.jobposting_start
    };

    if(jobToModify.jobPostingOpen === true){
      jobToModify.jobPostingOpen = false;
    } else {
      jobToModify.jobPostingOpen = true;
    }

    dbRoutesService.modifyJobStatus(jobToModify)
    .then(function (responseObject){
      $scope.getJobs();
      //success responseObject
      console.log('Success!!', responseObject.config.data);
    }, function(errorObject){
      //err
    });

  };

  $scope.init();
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
