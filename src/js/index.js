/* eslint-disable no-console */
/* globals angular */
(function() {
  window.currencyApp = angular
    .module('currencyApp', ['ui.bootstrap'])
    .constant('CURRENCY_API_URL', 'https://free.currencyconverterapi.com/api/v6/currencies')
    .constant('CURRENCY_CONVERT_API_URL', 'https://free.currencyconverterapi.com/api/v6/convert')
    .constant('CURRENCY_API_KEY', '8dd10bee3025f77fa7da');
}());