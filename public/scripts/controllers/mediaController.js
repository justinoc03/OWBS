myApp.controller("mediaController", ['$scope', function($scope){
  console.log('In mediaController');
    // set footer position for page
    angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
