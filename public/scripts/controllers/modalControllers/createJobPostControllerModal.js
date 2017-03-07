myApp.controller("createJobPostControllerModal", ['$scope', 'dbRoutesService', '$uibModalInstance', '$timeout', function($scope, dbRoutesService, $uibModalInstance, $timeout){
  console.log('in createJobPostControllerModal');

  ////////////////////Function: addNewJob in DB///////////////////////////////////
  $scope.addNewJob = function(){

    //assemble object with new job details
    var newJobToPost = {
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

}]);
