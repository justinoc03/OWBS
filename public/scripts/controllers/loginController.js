// components/login/login.controller.js
// (function () {
//   'use strict';

  // Set up the controller
  // angular.module('myApp')
  //   .controller('loginController', loginController);
  //
  // // Inject dependencies
  // loginController.$inject = ['authService'];
  //
  // //controller
  // function loginController(authService) {
  //
  //   var vm = this;
  //   vm.authService = authService;
  //
  // }

// }());

myApp.controller("loginController", ['authService', function(authService, loginController){
  'use strict';



    var vm = this;
    vm.authService = authService;


}]);
