myApp.controller("servicesController", ['$scope',"$window", function($scope, $window){
  console.log('In servicesController');
  $window.scrollTo(0, 0);
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","relative");
  //function to flip sercvice card
  $scope.flipCard = function(cardId){
    var cardNum = "card-" + cardId;
    var card = angular.element(document.getElementById(cardNum));
    card.toggleClass('flipped');
  };
}]);
