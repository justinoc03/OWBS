myApp.controller("servicesController", ['$scope', function($scope){
  console.log('In servicesController');
  $scope.showInfo = function(idNum){
    console.log("ShowInfo Click");
    var containerId = "container-" + idNum;
    var serviceId = "service-"+idNum;
    var serviceInfo = angular.element(document.getElementById(serviceId));
    var container = angular.element(document.getElementById(containerId));
    if(serviceInfo.css("visibility") == "hidden"){
      serviceInfo.removeClass("hidden");
    }
      container.addClass("scale");
  };
}]);
