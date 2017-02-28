myApp.controller("careersController", ['$scope', 'dbRoutesService', function($scope, dbRoutesService){
  console.log('In careersController');

  dbRoutesService.testFunction();

  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
