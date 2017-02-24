myApp.controller("servicesController", ['$scope', function($scope){
  console.log('In servicesController');
  $scope.showHideInfo = function(idNum, status){
    console.log("ShowInfo Click");
    var i;
    var containerId = "container-" + idNum;
    var serviceId = "service-"+idNum;
    var serviceInfo = angular.element(document.getElementById(serviceId));
    var container = angular.element(document.getElementById(containerId));
    var close = angular.element(container.children()[0]);
    var serviceDivs = document.getElementsByClassName('col-xs-4');
    if(status == "show"){
      for (i = 0; i < serviceDivs.length; i++) {
        if(serviceDivs[i].id != containerId){
          console.log(serviceDivs[i]);
          angular.element(serviceDivs[i]).addClass("hidden");
        }
      }
      container.addClass("scale");
      serviceInfo.removeClass("hidden");
      close.removeClass("hidden").addClass("visible");
    }
    if(status == "hide"){
      close.removeClass("visible").addClass("hidden");
      serviceInfo.addClass("hidden");
      for (i = 0; i < serviceDivs.length; i++) {
        if(serviceDivs[i].id != containerId){
          console.log(serviceDivs[i]);
          angular.element(serviceDivs[i]).removeClass("hidden").addClass("visible");
        }
      }
      container.removeClass("scale");
    }
  };
}]);
