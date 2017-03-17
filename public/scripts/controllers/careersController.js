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


    ////////////////////Function: submitJobApplication in DB///////////////////////////////////
    $scope.submitJobApplication = function(job, fileToUpload){
      //fileModel directive allows theinput file chooser to work inside ng-repeat
      // $scope.fileInputs = [1,2,3];
      var file = $scope[fileToUpload];
      console.dir(file);
      console.log(job);

      var base64File = '';

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
        base64File = reader.result.split(',')[1];
        //  console.log(base64File);

        reader.onerror = function (error) {
          console.log('Error: ', error);
       };

      //  console.log(base64File);

       //assemble object with new job details
       var emailInfoToOWBS = {
         applicantFirstName: job.applicantFirstName,
         applicantLastName: job.applicantLastName,
         applicantEmail: job.applicantEmail,
         applicantPhone: job.applicantPhone,
         commentsQuestions: job.commentsQuestions,
         jobPostingTitle: job.jobposting_name,
         fileName: file.name,
         fileType: file.type,
         base64File: base64File,
       };

      console.log('emailInfo', emailInfoToOWBS);

        dbRoutesService.emailJobApplication(emailInfoToOWBS)
        .then(function (responseObject){
          //success
          console.log('applicantEmail responseObject:', responseObject);

       }, function(errorObject){
         //err
         console.log('applicantEmail errorObject:', errorObject);
       });

      };

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
