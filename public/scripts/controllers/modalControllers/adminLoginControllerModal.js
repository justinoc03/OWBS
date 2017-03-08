myApp.controller("adminLoginControllerModal", ['$scope', 'dbRoutesService', '$uibModalInstance', '$timeout', function($scope, dbRoutesService, $uibModalInstance, $timeout){
  console.log('in adminLoginControllerModal');

  ////////////////////Function: addNewJob in DB///////////////////////////////////
  $scope.adminLogin = function(){
    console.log('in adminLogin');
    //assemble object with new job details
    var loginInfoToSend = {
      userName: $scope.userName,
      userPassword: $scope.userPassword
    };

    console.log('Modal newJobToPost', loginInfoToSend);

      dbRoutesService.adminLoginRoute(loginInfoToSend)
      .then(function (responseObject){
        //success
        console.log('Modal responseObject:', responseObject);
        if(responseObject.data === 'AWESOME'){
          console.log('good work');
          $scope.$close();
        } else{
          console.log('fuck off');
        }

     }, function(errorObject){
       //err
       console.log('Modal errorObject:', errorObject);
     });

 };//end addNewJob

}]);
