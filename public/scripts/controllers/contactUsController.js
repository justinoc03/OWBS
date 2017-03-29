myApp.controller("contactUsController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In contactUsController');
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
