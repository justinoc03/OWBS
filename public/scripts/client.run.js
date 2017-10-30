myApp.run( ['$rootScope', 'authService', 'lock', 'authManager', '$window', '$location', function($rootScope, authService, lock, authManager, $window, $location){
  console.log('in run function');

  $window.ga('create', 'UA-104691101-1', 'auto');

  $rootScope.$on('$stateChangeSuccess', function (event) {
    $window.ga('send', 'pageview', $location.path());
});

  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.registerAuthenticationListener();

  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();

  // Register the synchronous hash parser
  // when using UI Router
  lock.interceptHash();

  var profileParsed = JSON.parse(localStorage.getItem('profile'));
  console.log(profileParsed);


}]);//end dbRoutesService


//////////////////////////////////Other auth0 version/////////////////////////////////////////////////
// // app.run.js
// (function () {
//
//   'use strict';
//
//   angular
//     .module('myApp')
//     .run(run);
//
//   run.$inject = ['$rootScope', 'authService', 'lock'];
//
//   function run($rootScope, authService, lock) {
//     console.log('in run function');
//     // Put the authService on $rootScope so its methods
//     // can be accessed from the nav bar
//     $rootScope.authService = authService;
//
//     // Register the authentication listener that is
//     // set up in auth.service.js
//     authService.registerAuthenticationListener();
//
//     // Register the synchronous hash parser
//     // when using UI Router
//     lock.interceptHash();
//   }
//
// })();
