myApp.controller("servicesController", ['$scope', function($scope){
  console.log('In servicesController');
  $scope.flipCard = function(cardId){
      var cardNum = "card-" + cardId;
      var card = angular.element(document.getElementById(cardNum));
      console.log(card);
      card.toggleClass('flipped');
  };
}]);
