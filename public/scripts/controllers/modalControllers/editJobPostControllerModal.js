myApp.controller("editJobPostControllerModal", ['$scope', 'dbRoutesService', '$uibModalInstance', '$timeout', 'job', function($scope, dbRoutesService, $uibModalInstance, $timeout, job){
  console.log('in editJobPostControllerModal');
  console.log(job);


  // $scope.currentJobTitle = job.jobposting_name;


  ////////////////////Function: addNewJob in DB///////////////////////////////////
  $scope.editJobPosting = function(job){

    //assemble object with new job details
    var editedJobDetails = {
      jobPostingName: $scope.newJobTitle,
      jobPostingDescription: $scope.newJobDescription,
      jobPostingOpen: true
    };

    console.log('Modal newJobToPost', newJobToPost);

      dbRoutesService.newJobPosting(newJobToPost)
      .then(function (responseObject){
        //success
        console.log('Modal responseObject:', responseObject);
        $scope.$close();
     }, function(errorObject){
       //err
       console.log('Modal errorObject:', errorObject);
     });

 };//end addNewJob

 ////////////////////Function: editJobPosting in DB///////////////////////////
 $scope.editJobPosting = function(job){
   //assemble object to send to DB put route
   jobToModify = {
     jobPostingID: job.jobposting_id,
     jobPostingName: job.jobposting_name,
     jobPostingDescription: job.jobposting_description,
     jobPostingOpen: job.jobposting_open,
     jobPostingStart: job.jobposting_start
   };

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
 };//end editJobPosting

}]);
