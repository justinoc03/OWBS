myApp.controller("servicesController", ['$scope', function($scope){
  console.log('In servicesController');
  $scope.showInfo = function(idNum){
    console.log("ShowInfo Click");
    var id = "service-"+idNum;
    var serviceInfo = angular.element(document.getElementById(id));
    if(serviceInfo.css("visibility") == "hidden"){
      serviceInfo.removeClass("hidden");
    }
  };
}]);
