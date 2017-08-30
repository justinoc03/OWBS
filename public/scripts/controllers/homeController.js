myApp.controller("homeController", ['$scope', '$http', '$location', '$interval', '$rootScope', function($scope, $http, $location, $interval, $rootScope){
  console.log('In homeController');

  $scope.contactUsButton = function() {
    $location.path('/contactUs');
  };

  var animateTower = function(){
      setTimeout(function() {
        document.getElementById("center").setAttribute("fill", "#EE8434");
      },1000);
      setTimeout(function() {
        document.getElementById("center").setAttribute("fill", "#343839");
        document.getElementById("first-ray").setAttribute("fill", "#EE8434");
      },2000);
      setTimeout(function() {
        document.getElementById("first-ray").setAttribute("fill", "#343839");
        document.getElementById("second-ray").setAttribute("fill", "#EE8434");
      },3000);
      setTimeout(function() {
        document.getElementById("second-ray").setAttribute("fill", "#343839");
        document.getElementById("third-ray").setAttribute("fill", "#EE8434");
      },4000);
      setTimeout(function() {
        document.getElementById("third-ray").setAttribute("fill", "#343839");
        document.getElementById("fourth-ray").setAttribute("fill", "#EE8434");
      },5000);
      setTimeout(function() {
        document.getElementById("fourth-ray").setAttribute("fill", "#343839");
      },6000);
    };

  //fire animateTower on load
  animateTower();

  //set the interval for animateTower
  $scope.towerInterval = setInterval(function() {
    animateTower();
    }, 6000);

  //kill towerInterval on route change
  $scope.$on('$locationChangeStart', function(event) {
    console.log('stop towerInterval');
    console.log(clearInterval($scope.towerInterval));
  });


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
