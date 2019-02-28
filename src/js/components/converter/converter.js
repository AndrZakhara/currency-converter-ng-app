/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  angular
    .module('currencyApp')
    .component('converter', {
      templateUrl: './templates/converterTemplate.html',
      replace: true,
      controller: 'CurrencyController'
    });
})());