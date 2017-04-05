myApp.run( ['$rootScope', 'authService', 'lock', 'authManager', function($rootScope, authService, lock, authManager){
  console.log('in run function');

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