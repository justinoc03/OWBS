myApp.controller("whoWeAreController", ['$scope', '$http', '$location','$window', function($scope, $http, $location, $window){
  console.log('In whoWeAreController');
  $window.scrollTo(0, 0);
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
