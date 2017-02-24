myApp.controller("servicesController", ['$scope', function($scope){
  console.log('In servicesController');
  var card = document.getElementById('card');
  card.addEventListener( 'click', function(){
    angular.element(card).toggleClass('flipped');
  }, false);
}]);
