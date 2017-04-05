// components/login/login.controller.js
(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('loginController', loginController);

  loginController.$inject = ['authService'];

  function loginController(authService) {

    var vm = this;
    vm.authService = authService;

  }

}());
