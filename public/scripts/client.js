console.log("ClientJS is sourced");

//source in angular
var myApp = angular.module("myApp", ['ui.bootstrap', 'ui.router', 'angularTrix', 'ngSanitize']);

///////////////////////////Angular Routing///////////////////////////////////////
// config method doesnt take a name, we are just configuring myApp,
// It does take in a dependency injection array
myApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/redirectNotice');
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: '/views/partials/home.html',
      controller: 'homeController'
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
      controller: "careersController"
    })
    .state('adminEditCareers',{
      url:"/adminEditCareers",
      templateUrl: "/views/partials/adminEditCareers.html",
      controller: "adminEditCareersController"
    })
    .state('redirectNotice',{
      url:'/redirectNotice',
      templateUrl: "/views/partials/redirectNotice.html",
      controller: "redirectNoticeController"
    });
  });


// JQuery to collapse mobile-style navbar menu button after clicking on link
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
