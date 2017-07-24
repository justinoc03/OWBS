myApp.controller("homeController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In homeController');

  $scope.contactUsButton = function() {
    $location.path('/contactUs');
  };

  angular.element(document.getElementById("home-images")).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false
  });
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css({"position":"relative", "margin-top":" -11px"});
}]);
