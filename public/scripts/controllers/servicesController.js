myApp.controller("servicesController", ['$scope',"$window", function($scope, $window){
  console.log('In servicesController');
  $scope.showServiceCards = false;
  $scope.showServiceContent = true;
  $window.scrollTo(0, 0);

  //function to flip sercvice card
  $scope.showService = function(serviceId){
    var menu = angular.element(document.getElementById("services-menu")).children();
    var minusOne = Number(serviceId) - 1;
    var serviceNum = "service-" + serviceId;
    var service = angular.element(document.getElementById(serviceNum));
    if(angular.element(document.getElementById("serviceLanding")).css("display") == "block"){
      angular.element(document.getElementById("serviceLanding")).addClass("hidden");
    }
    for (var i = 0; i <= 10; i++) {
      if (i != serviceId){
        angular.element(document.getElementById("service-" + i)).addClass("hidden");
        angular.element(menu[i-1]).removeClass("selected");
      }
    }
    service.removeClass('hidden');

      angular.element(menu[minusOne]).addClass("selected");
  };

  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);
