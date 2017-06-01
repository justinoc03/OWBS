myApp.controller("servicesController", ['$scope',"$window", function($scope, $window){
  console.log('In servicesController');
  $scope.showServiceCards = false;
  $scope.showServiceContent = true;
  $window.scrollTo(0, 0);
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
  //function to flip sercvice card
  $scope.flipCard = function(cardId){
    var cardNum = "card-" + cardId;
    var card = angular.element(document.getElementById(cardNum));
    card.toggleClass('flipped');
  };
  $scope.showServices = function(){
    $scope.showServiceCards = true;
    $scope.showServiceContent = false;
  };
}]);
