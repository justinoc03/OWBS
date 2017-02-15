console.log("ClientJS is sourced");

//source in angular
var myApp = angular.module("myApp", ['ngRoute']);

///////////////////////////Angular Routing///////////////////////////////////////
// config method doesnt take a name, we are just configuring myApp,
// It does take in a dependency injection array
myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
      when("/home",{
        templateUrl: "/views/partials/home.html",
        controller: "homeController"
      }).
      when("/services",{
        templateUrl: "/views/partials/services.html",
        controller: "servicesController"
      }).
      when("/media",{
        templateUrl: "/views/partials/media.html",
        controller: "mediaController"
      }).
      when("/whoWeAre",{
        templateUrl: "/views/partials/whoWeAre.html",
        controller: "whoWeAreController"
      }).
      when("/staff",{
        templateUrl: "/views/partials/staff.html",
        controller: "staffController"
      }).
      when("/careers",{
        templateUrl: "/views/partials/careers.html",
        controller: "careersController"
      }).
      when("/redirectNotice",{
        templateUrl: "/views/partials/redirectNotice.html",
        controller: "redirectNoticeController"
      }).
      otherwise({
        redirectTo: "/redirectNotice"
      });
}]);
