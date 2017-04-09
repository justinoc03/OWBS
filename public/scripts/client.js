//////////////////Turn console.log on or off//////////////////
var init = function(){
  //turn all logs on or off
  logsOnOff('on');
  //test logs
  console.log("ClientJS is sourced");
};

//////////////////Create Angular App//////////////////
var myApp = angular.module("myApp", ['ui.bootstrap', 'ui.router', 'angularTrix', 'ngSanitize', 'ngMask', 'ngAnimate', 'ngToast', 'auth0.lock', 'angular-jwt']);

///////////////////////////Angular Routing///////////////////////////////////////
// config method doesnt take a name, we are just configuring myApp,
// It does take in a dependency injection array
myApp.config(function($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider){
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: '/views/partials/home.html',
      controller: 'homeController',
      controllerAs: 'vm'
    })
    .state('services',{
      url:'/services',
      templateUrl: "/views/partials/services.html",
      controller: "servicesController"
    })
    .state('media',{
      url:'/media',
      templateUrl: "/views/partials/media.html",
      controller: "mediaController"
    })
    .state('whoWeAre',{
      url:'/whoWeAre',
      templateUrl: "/views/partials/whoWeAre.html",
      controller: "whoWeAreController"
    })
    .state('staff',{
      url:'/staff',
      templateUrl: "/views/partials/staff.html",
      controller: "staffController"
    })
    .state('careers',{
      url:"/careers",
      templateUrl: "/views/partials/careers.html",
      controller: "careersController",
      controllerAs: 'vm'
    })
    .state('adminEditCareers',{
      url:"/adminEditCareers",
      templateUrl: "/views/partials/adminEditCareers.html",
      controller: "adminEditCareersController"
    })
    .state('contactUs',{
      url:"/contactUs",
      templateUrl: "/views/partials/contactUs.html",
      controller: "contactUsController"
    })
    .state('redirectNotice',{
      url:'/redirectNotice',
      templateUrl: "/views/partials/redirectNotice.html",
      controller: "redirectNoticeController"
    });

    lockProvider.init({
      clientID: 'oCyvgO2rUP0v7qJi8yHloIz9kNQcbzLj',
      domain: 'oconnorjustin.auth0.com',
      options: {
        _idTokenVerification: false,
        // auth: {
        //   redirectUrl: 'http://localhost:9000/#!/adminEditCareers',
        // }
      }
    });

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function () {
        return localStorage.getItem('id_token');
      }
    });

  });

  //configure ngToast animation options as slide or fade
  myApp.config(['ngToastProvider', function(ngToastProvider) {
    ngToastProvider.configure({
      animation: 'slide', // or 'fade'
      dismissOnClick: false,
      dismissButton: true,
      timeout: 30000,
    });
  }]);

// JQuery to collapse mobile-style navbar menu button after clicking on link
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
}); //end of myApp

//Turns on or off all console.log
var logsOnOff = function(status) {
  if(status === 'off'){
    console.log = function() {};
    console.dir = function() {};
  }
};

//directive to allow the file chooser on the careers section to properly find the file inside ng-repeat
myApp.directive('fileModel', ['$parse', function ($parse) {
  console.log('in fileModel directive');
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model, modelSetter;

      attrs.$observe('fileModel', function(fileModel){
        model = $parse(attrs.fileModel);
        modelSetter = model.assign;
      });

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope.$parent, element[0].files[0]);
        });
      });
    }
  };
}]);

/////////////////Run init function////////////////////////
init();
