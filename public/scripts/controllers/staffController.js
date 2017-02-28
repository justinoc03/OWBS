myApp.controller("staffController", ['$scope', function($scope){
  console.log('In staffController');
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
  $scope.staffToggle = function(staffId){
      var staffNum = "staff-" + staffId;
      var staffMember = angular.element(document.getElementById(staffNum));
      staffMember.toggleClass('flipped');
  };
}]);
