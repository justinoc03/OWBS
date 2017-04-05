myApp.service('authService', ['$http', '$q', 'lock', 'authManager', function($http, $q, lock, authManager){

  var deferredProfile = $q.defer();

  function login() {
    lock.show();
  }

  // Logging out just requires removing the user's
  // id_token and profile
  function logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    authManager.unauthenticate();
  }

  // Set up the logic for when a user authenticates
  // This method is called from app.run.js
  function registerAuthenticationListener() {
    lock.on('authenticated', function (authResult) {

      lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          deferredProfile.resolve(profile);
          
          var profileParsed = JSON.parse(localStorage.getItem('profile'));
          console.log(profileParsed);
        });


      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

    });

    lock.on('authorization_error', function (err) {
        console.log(err);
      });
  }

  return {
    login: login,
    logout: logout,
    registerAuthenticationListener: registerAuthenticationListener
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
