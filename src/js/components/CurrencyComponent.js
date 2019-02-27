/* eslint-disable no-console */
/* globals currencyApp angular */
(function() {
  angular
    .module('currencyApp')
    .component('currencyApp', {
      templateUrl: 'converterTemplate.html',
      replace: true
    });
});