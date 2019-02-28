/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  angular
    .module('currencyApp')
    .component('noConnect', {
      templateUrl: './templates/noConnectTemplate.html',
      replace: true
    });
})());