myApp.controller("editJobPostControllerModal", ['$scope', 'dbRoutesService', '$uibModalInstance', '$timeout', 'job', function($scope, dbRoutesService, $uibModalInstance, $timeout, job){
  console.log('in editJobPostControllerModal');
  console.log(job);

  $scope.init = function(){
    $scope.currentJobTitle = job.jobposting_name;
    $scope.currentJobDescription = job.jobposting_description;
  };

  ////////////////////Function: addNewJob in DB///////////////////////////////////
  $scope.editJobPosting = function(){

    //assemble object with new job details
    var editedJobDetails = {
      jobPostingName: $scope.currentJobTitle,
      jobPostingDescription: $scope.currentJobDescription,
      jobPostingID: job.jobposting_id,
      jobPostingOpen: job.jobposting_open,
      jobPostingStart: job.jobposting_start
    };

    console.log('Modal editJobPosting', editedJobDetails);

      dbRoutesService.modifyJobPosting(editedJobDetails)
      .then(function (responseObject){
        //success
        console.log('Modal responseObject:', responseObject);
        $scope.$close();
     }, function(errorObject){
       //err
       console.log('Modal errorObject:', errorObject);
     });

 };//end editJobPosting

 $scope.init();
}]);
