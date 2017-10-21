myApp.controller("navController", ['$scope', '$http', '$location', '$rootScope', 'authService', function($scope, $http, $location, $rootScope, authService){
  console.log('In navController');
  $('#smallLogo').addClass('hide');

$(window).scroll(function () {
  if ($(document).scrollTop() > 15) {
    $('nav').addClass('shrink');
    $('.navbar-shadow').addClass('shrink');
    $('.nav-shape-shadow').addClass('shrink');
    $('#largeLogo').addClass('hide');
    $('#smallLogo').removeClass('hide');
  } else {
    $('nav').removeClass('shrink');
    $('.navbar-shadow').removeClass('shrink');
    $('.nav-shape-shadow').removeClass('shrink');
    $('#largeLogo').removeClass('hide');
    $('#smallLogo').addClass('hide');
  }
});

  //auth0 login
  $scope.auth0Login = function(){
    var vm = this;
    vm.authService = authService;
    vm.authService.login();
  };

  //auth0 logout
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
