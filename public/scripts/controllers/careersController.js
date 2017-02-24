myApp.controller("careersController", ['$scope', function($scope){
  console.log('In careersController');
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
