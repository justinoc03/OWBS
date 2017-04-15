myApp.controller("staffController", ['$scope','$window', function($scope, $window){
  console.log('In staffController');
  $window.scrollTo(0, 0);
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
  $scope.staffToggle = function(staffId){
      var staffNum = "staff-" + staffId;
      var staffMember = angular.element(document.getElementById(staffNum));
      staffMember.toggleClass('flipped');
  };
}]);
