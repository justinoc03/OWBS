myApp.controller("redirectNoticeController", ['$scope','$timeout', '$location', '$interval', function($scope, $timeout, $location, $interval){
  console.log('In redirectNoticeController');

  //create timeout redirect after 3 seconds
  $timeout(function(){
   $location.path('/home');
 }, 1000);
}]);
