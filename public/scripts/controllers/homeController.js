myApp.controller("homeController", ['$scope', function($scope){
  console.log('In homeController');
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
