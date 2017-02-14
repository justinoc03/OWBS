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
      when("/whoWeAre",{
        templateUrl: "/views/partials/whoWeAre.html",
        controller: "whoWeAreController"
      }).
      when("/redirectNotice",{
        templateUrl: "/views/partials/redirectNotice.html",
        controller: "redirectNoticeController"
      }).
      otherwise({
        redirectTo: "/redirectNotice"
      });
}]);
