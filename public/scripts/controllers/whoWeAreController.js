myApp.controller("whoWeAreController", ['$scope', '$http', '$location','$window', function($scope, $http, $location, $window){
  console.log('In whoWeAreController');
  $window.scrollTo(0, 0);
  angular.element(document.getElementById("who-slide-1")).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    variableWidth: true,
  });
  angular.element(document.getElementById("who-slide-2")).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
    autoplaySpeed: 7000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    variableWidth: true,
  }).slick("slickPause");
  angular.element(document.getElementById("who-slide-3")).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    variableWidth: true,
  }).slick("slickPause");
  var slider2 = $('#who-slide-2');
  var slider3= $('#who-slide-3');
  var initialDelay = 1000;
  var secondDelay = 2000;
  setTimeout(function() {
      slider2.slick("slickPlay");
    },initialDelay);
    setTimeout(function() {
        slider3.slick("slickPlay");
      },secondDelay);
  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
