myApp.controller("whoWeAreController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In whoWeAreController');
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
