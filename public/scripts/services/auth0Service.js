myApp.service('authService', ['$http', '$q', 'lock', 'authManager', '$rootScope', '$location' ,function($http, $q, lock, authManager, $rootScope, $location){


  var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
     var deferredProfile = $q.defer();

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
           //edited so when user is logged in they are redirected to adminEditCareersController
         });

       });

       lock.on('authorization_error', function (err) {
         console.log(err);
       });
     }

     function getProfileDeferred() {
       return deferredProfile.promise;
     }

     function isAdmin() {
       return userProfile && userProfile.app_metadata
         && userProfile.app_metadata.roles
         && userProfile.app_metadata.roles.indexOf('adminOWBS') > -1;
     }

     $rootScope.$on('$stateChangeStart', function(event, nextRoute) {
       if (nextRoute.controller === 'adminEditCareersController') {
         if (!isAdmin()) {
           alert('You are not allowed to see the Admin content');
           return event.preventDefault();
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
