/* eslint-disable no-console */
/* globals angular */
(function() {
  window.currencyApp = angular
    .module('currencyApp', ['ui.bootstrap'])
    .constant('CURRENCY_API_URL', 'https://free.currencyconverterapi.com/api/v6/currencies')
    .constant('CURRENCY_CONVERT_API_URL', 'https://free.currencyconverterapi.com/api/v6/convert')
    .constant('CURRENCY_API_KEY', '8dd10bee3025f77fa7da')
    .constant('FEE', '[0, 1, 1.5, 2.5, 4]')
    .constant('CURRENCY_FROM', 'USD')
    .constant('CURRENCY_TO', 'UAH')
    .constant('LABEL_FROM', 'Currency I Have:')
    .constant('LABEL_TO', 'Currency I Want:')
    .constant('LABEL_TO_NEED', 'Currency I Need:');
}());