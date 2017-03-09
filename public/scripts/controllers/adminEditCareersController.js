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


  $scope.init();
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
