/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  angular
    .module('currencyApp')
    .component('currencyApp', {
      templateUrl: './templates/converterTemplate.html',
      replace: true
    });
})());