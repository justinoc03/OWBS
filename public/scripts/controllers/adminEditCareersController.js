myApp.controller("adminEditCareersController", ['$scope', 'dbRoutesService', '$timeout', '$uibModal', '$location', function($scope, dbRoutesService, $timeout, $uibModal, $location){
  console.log('In adminEditCareersController');
  $scope.init = function(){
    $scope.verifyUser();
  };

  $scope.verifyUser = function(){
    console.log("hit verify employee");
    if (sessionStorage.user === undefined){
      alert("You must have a valid login");
      sessionStorage.clear();
      $location.path('/home');
    } else{
      console.log('verified');
    }
  };

  //init function that is run at the bottom of this careersController
  $scope.init = function(){
    //global variables
    $scope.jobsArray = [];
    //functions to run on load
    $scope.getJobs();
  };

  ////////////////////Function: adminLogin ///////////////////////
  $scope.adminLogin = function(){
    var modalInstance = $uibModal.open({
      templateUrl: './views/modalViews/adminLoginModal.html',
      controller: 'adminLoginControllerModal'
    });

    modalInstance.result.then(function(res){
      //success
      console.log('logged in properly');
    }, function(err){
      //success
      console.log('error loggin in');
    });
  };

  ////////////////////Function: startAddNewJob ///////////////////////
  $scope.startAddNewJob = function(){
    var modalInstance = $uibModal.open({
      templateUrl: './views/modalViews/createJobPostModal.html',
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

   console.log('job', job);

   var test = confirm(job.jobposting_name + " job posting will be deleted forever, would you like to proceed?");
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
};//end deleteJobPosting

  ////////////////////Function: changePostStatus in DB///////////////////////////
  $scope.changePostStatus = function(job){
    //assemble object to send to DB put route
    jobStatusToChange = {
      jobPostingID: job.jobposting_id,
      jobPostingName: job.jobposting_name,
      jobPostingDescription: job.jobposting_description,
      jobPostingOpen: job.jobposting_open,
      jobPostingStart: job.jobposting_start
    };

    //if the job posting status is true, change to false and vice versa
    if(jobStatusToChange.jobPostingOpen === true){
      jobStatusToChange.jobPostingOpen = false;
    } else {
      jobStatusToChange.jobPostingOpen = true;
    }

    //route status and promise to get the information back properly.
    dbRoutesService.modifyJobPosting(jobStatusToChange)
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
  };//end changePostStatus

  ////////////////////Function: startAddNewJob ///////////////////////
  $scope.editJobPost = function(job){
    var modalInstance = $uibModal.open({
      templateUrl: './views/modalViews/editJobPostModal.html',
      controller: 'editJobPostControllerModal',
      resolve: {
        job: function () {
          return job;
        },
      }
    });

    modalInstance.result.then(function(res){
      //success
      $scope.getJobs();
    }, function(err){
      //success
      $scope.getJobs();
    });
  };

  //..................................End Database calls to dbRoutesService.......................................//
  $scope.showJob = function(){
    console.log(this.$index);
    var id = this.$index;
    var postingId = "job-posting-" + id;
    var job = angular.element(document.getElementById(postingId));
    if(angular.element(document.getElementById("admin-landing")).css("display") == "block"){
      angular.element(document.getElementById("admin-landing")).addClass("hidden");
    }
    for (var i = 0; i <= 10; i++) {
      if (i != id){
        angular.element(document.getElementById("job-posting-" + i)).css("display", "none");
        // angular.element(menu[i-1]).removeClass("selected");
      }
    }
    job.css('display', "block");

      // angular.element(menu[minusOne]).addClass("selected");
  };

  //initialize any functions on load
  $scope.init();
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","relative");



}]);
