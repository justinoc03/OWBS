myApp.controller("careersController", ['$scope', 'dbRoutesService', '$timeout', '$uibModal','$location','$http','$q', function($scope, dbRoutesService, $timeout, $uibModal, $location, $http, $q){
  console.log('In careersController');

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


  // ////////////////////Function: submitApplication ///////////////////////
  // $scope.submitApplication = function(job){
  //   console.log(job.jobposting_id);
  //
  //     //dependency $q is used for promises when working with Async data from a database
  //     var defer = $q.defer();
  //
  //     $http({
  //       method: 'POST',
  //       url: '/testEmail',
  //       // data: job
  //     }).then(function success(responseObject){
  //         defer.resolve(responseObject);
  //       }, function error(errorObject, status){
  //         console.log('there was an error modifying info in the DB', errorObject);
  //         defer.reject(errorObject);
  //       });
  //       return defer.promise;
  //   };

  $scope.testUpload = function(filename){
    // $scope.fileInputs = [1,2,3];
    // var file = $scope[filename];
    // console.log('file is ' + JSON.stringify(file));
    // console.dir(file);


    // $scope.fileInputs = [1,2,3];
    // var file = $scope[myFile];
    // console.log('file is ' + JSON.stringify(file));
    // console.dir(file);

      // var file = $scope[myFile];
      // var emailInfoToOWBS = {
      //   applicantName: job.applicantName,
      //   applicantEmail: job.applicantEmail,
      //   file: job.myFile
      // };
      // console.dir(file);

  };

    ////////////////////Function: addNewJob in DB///////////////////////////////////
    $scope.submitJobApplication = function(job, fileToUpload){
      //fileModel directive allows theinput file chooser to work inside ng-repeat
      // $scope.fileInputs = [1,2,3];
      var file = $scope[fileToUpload];
      console.dir(file);
      console.log('job', job);

      //assemble object with new job details
      var emailInfoToOWBS = {
        applicantName: job.applicantName,
        applicantEmail: job.applicantEmail,
        file: file,
      };

      console.log('emailInfo', emailInfoToOWBS);

      //   dbRoutesService.emailJobApplication(emailInfoToOWBS)
      //   .then(function (responseObject){
      //     //success
      //     console.log('applicantEmail responseObject:', responseObject);
       //
      //  }, function(errorObject){
      //    //err
      //    console.log('applicantEmail errorObject:', errorObject);
      //  });

   };//end addNewJob

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
