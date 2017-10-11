myApp.service('authService', ['$http', '$q', 'lock', 'authManager', '$rootScope', '$location', '$timeout', function($http, $q, lock, authManager, $rootScope, $location, $timeout){


  var deferredProfile = $q.defer();
  var userProfile = JSON.parse(localStorage.getItem('profile')) || null;


  if (userProfile) {
    deferredProfile.resolve(userProfile);
  }

 function login() {
   lock.show();
 }

  // Logging out just requires removing the user's
  // id_token and profile
  function logout() {
    deferredProfile = $q.defer();
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    authManager.unauthenticate();
    userProfile = null;
  }

  // Set up the logic for when a user authenticates
  // This method is called from app.run.js
  function registerAuthenticationListener() {
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        userProfile = profile;
        deferredProfile.resolve(profile);
        //reroute authenticated user to adminEditCareers
        $location.path('/adminEditCareers');
        //log profile from localStorage
        var profileParsed = JSON.parse(localStorage.getItem('profile'));
        console.log(profileParsed);
      });
   });

   lock.on('authorization_error', function (err) {
     console.log(err);
   });
 } //end registerAuthenticationListener

 function getProfileDeferred() {
   return deferredProfile.promise;
 }

 function isAdmin() {
   //timeout causes isAdmin to wait just long enough for the profile to resolve before loading /adminEditCareers
   //not happy with the flicker from showing the home address first, but it works for now
   $timeout(function () {
  }, 0);
   return userProfile && userProfile.app_metadata
     && userProfile.app_metadata.roles
     && userProfile.app_metadata.roles.indexOf('adminOWBS') > -1;
 }

 $rootScope.$on('$stateChangeStart', function(event, nextRoute) {
   if (nextRoute.controller === 'adminEditCareersController') {
     if (!isAdmin()) {
       alert('You are not allowed to see the Admin content');

      //  return event.preventDefault();
       return $location.path('/careers');
     }
   }
 });

 return {
   login: login,
   logout: logout,
   registerAuthenticationListener: registerAuthenticationListener,
   getProfileDeferred: getProfileDeferred
 };

}]);//end authService


//////////////////////////////////Other auth0 version/////////////////////////////////////////////////
// (function () {
//
//   'use strict';
//
//   angular
//     .module('myApp')
//     .service('authService', authService);
//
//   authService.$inject = ['lock', 'authManager'];
//
//   function authService(lock, authManager) {
//
//     function login() {
//       lock.show();
//     }
//
//     // Logging out just requires removing the user's
//     // id_token and profile
//     function logout() {
//       localStorage.removeItem('id_token');
//       localStorage.removeItem('profile');
//       authManager.unauthenticate();
//     }
//
//     // Set up the logic for when a user authenticates
//     // This method is called from app.run.js
//     function registerAuthenticationListener() {
//       lock.on('authenticated', function (authResult) {
//         localStorage.setItem('id_token', authResult.idToken);
//         authManager.authenticate();
//       });
//     }
//
//     return {
//       login: login,
//       logout: logout,
//       registerAuthenticationListener: registerAuthenticationListener
//     };
//   }
// })();
