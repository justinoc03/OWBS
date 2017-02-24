myApp.controller("servicesController", ['$scope', function($scope){
  console.log('In servicesController');
  //function to flip sercvice card
  $scope.flipCard = function(cardId){
      var cardNum = "card-" + cardId;
      var card = angular.element(document.getElementById(cardNum));
      card.toggleClass('flipped');
  };
}]);
