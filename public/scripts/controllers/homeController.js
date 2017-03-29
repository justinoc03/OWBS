myApp.controller("homeController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In homeController');

  $scope.contactUsButton = function() {
    $location.path('/contactUs');
  };


  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
