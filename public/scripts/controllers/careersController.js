myApp.controller("careersController", ['$scope', 'dbRoutesService', '$timeout', '$uibModal', function($scope, dbRoutesService, $timeout, $uibModal){
  console.log('In careersController');

  //global variables
  $scope.jobsArray = [];

  //init function that is run at the bottom of this careersController
  $scope.init = function(){
    $scope.getJobs();
  };

  ////////////////////Function: startAddNewJob ///////////////////////
  $scope.startAddNewJob = function(){
    var modalInstance = $uibModal.open({
      templateUrl: './views/modals/createJobPostModal.html',
      controller: 'createJobPostControllerModal'
    });

    modalInstance.result.then(function(res){
      //success
      $scope.getJobs();
    }, function(err){
      //success
      $scope.getJobs();
    });
  };

  /////////////////////////////////////////////Database calls to dbRoutesService//////////////////////////////////////////////
  ////////////////////Function GET Route: getJobs from DB ///////////////////////
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

 ////////////////////Function: deleteJobPosting in DB///////////////////////
 $scope.deleteJobPosting = function(job){

   var test = confirm(job.jobposting_name + " job posting will be delete forever, would you like to proceed?");
      if (test === false){
      } else {

     console.log('job', job);
     //assemble object to send to DB put route
     jobToDelete = {
       jobPostingID: job.jobposting_id,
     };

     console.log('job', jobToDelete);

     //route status and promise to get the information back properly.
     dbRoutesService.deleteJob(jobToDelete)
     .then(function (responseObject){
       //success responseObject
       //timeout is used to make sure the slider visual is completed before the jobsArray object is rebuilt
       $timeout(function(){
        $scope.getJobs();
      }, 250);

      console.log('new jobsArray:', $scope.jobsArray);
     }, function(errorObject){
       //err
     });
  }//end of else statement
 };//end modifyJobPosting

  ////////////////////Function: modifyJobPosting in DB///////////////////////////
  $scope.modifyJobPosting = function(job){
    //assemble object to send to DB put route
    jobToModify = {
      jobPostingID: job.jobposting_id,
      jobPostingName: job.jobposting_name,
      jobPostingDescription: job.jobposting_description,
      jobPostingOpen: job.jobposting_open,
      jobPostingStart: job.jobposting_start
    };

    //if the job posting status is true, change to false and vice versa
    if(jobToModify.jobPostingOpen === true){
      jobToModify.jobPostingOpen = false;
    } else {
      jobToModify.jobPostingOpen = true;
    }

    //route status and promise to get the information back properly.
    dbRoutesService.modifyJobStatus(jobToModify)
    .then(function (responseObject){
      //success responseObject
      //timeout is used to make sure the slider visual is completed before the jobsArray object is rebuilt
      $timeout(function(){
       $scope.getJobs();
     }, 250);

      console.log('new jobsArray:', $scope.jobsArray);
    }, function(errorObject){
      //err
    });
  };//end modifyJobPosting
  //..................................End Database calls to dbRoutesService.......................................//


  //initialize any functions on load
  $scope.init();

  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
