myApp.controller("navController", ['$scope', '$http', '$location', '$rootScope', 'authService', function($scope, $http, $location, $rootScope, authService){
  console.log('In navController');

  $scope.auth0Logout = function(nextRoute){
    var vm = this;
    vm.authService = authService;
    vm.authService.logout();

    //if logging out from adminEditCareers redirect to careers page
    //all other pages will remain
    if($location.path() === '/adminEditCareers'){
      $location.path('/careers');
    }

    //checks localStorage to see if profile is cleared/null
    var profileParsed = JSON.parse(localStorage.getItem('profile'));
    console.log(profileParsed);

  }; //end auth0Logout

}]);
