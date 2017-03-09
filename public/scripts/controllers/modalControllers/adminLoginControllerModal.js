myApp.controller("adminLoginControllerModal", ['$scope', 'dbRoutesService', '$uibModalInstance', '$timeout', '$location', function($scope, dbRoutesService, $uibModalInstance, $timeout, $location){
  console.log('in adminLoginControllerModal');
  $scope.init = function(){

  };

  $scope.verifyUser = function(){
  if (sessionStorage.user === undefined){
    console.log('not verified');
    } else{
      console.log('verified');
      $location.path('/adminEditCareers');
    }
  };

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
          sessionStorage.user = JSON.stringify(responseObject.config.data.userName);
          $scope.$close();
          $location.path('/adminEditCareers');
        } else{
          console.log('fuck off');
          sessionStorage.clear();
        }
     }, function(errorObject){
       //err
       console.log('Modal errorObject:', errorObject);
     });

 };//end addNewJob

 $scope.init();
}]);
