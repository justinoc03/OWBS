myApp.controller("careersController", ['$scope', 'testService', function($scope, testService){
  console.log('In careersController');

  testService.testFunction();

  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
