myApp.controller("contactUsController", ['$scope', '$http', '$location',"$window", function($scope, $http, $location, $window){
  console.log('In contactUsController');
  $window.scrollTo(0, 0);




  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","static");
}]);
