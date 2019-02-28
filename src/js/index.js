/* eslint-disable no-console */
/* globals angular currencyApp*/
(function() {
  window.currencyApp = angular
    .module('currencyApp', ['ui.bootstrap', 'ui.router'])
    .constant('CURRENCY_API_URL', 'https://free.currencyconverterapi.com/api/v6/currencies')
    .constant('CURRENCY_CONVERT_API_URL', 'https://free.currencyconverterapi.com/api/v6/convert')
    .constant('CURRENCY_API_KEY', '8dd10bee3025f77fa7da')
    .constant('FEE', '[0, 1, 1.5, 2.5, 4]')
    .constant('CURRENCY_FROM', 'USD')
    .constant('CURRENCY_TO', 'UAH')
    .constant('LABEL_FROM', 'Currency I Have:')
    .constant('LABEL_TO', 'Currency I Want:')
    .constant('LABEL_TO_NEED', 'Currency I Need:')
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state({
          name: 'main',
          url: '/main',
          template: '<h3>Main page</h3>'
        })
        .state({
          name: 'converter',
          url: '/converter',
          templateUrl: 'templates/converterTemplate.html',
          controller: 'CurrencyController'
        })
        .state({
          name: 'contacts',
          url: '/contacts',
          template: '<h3>Contact page</h3>'
        })
        .state({
          name: 'about',
          url: '/about',
          template: '<h3>About page</h3>'
        });
    }])
    .run(['$window', '$rootScope', function($window, $rootScope) {
      $rootScope.online = navigator.onLine;

      $window.addEventListener('offline', function() {
        $rootScope.$apply(() => {
          $rootScope.online = false;
        });
      });

      $window.addEventListener('online', function() {
        $rootScope.$apply(() => {
          $rootScope.online = true;
        });
      });
    }]);
}());