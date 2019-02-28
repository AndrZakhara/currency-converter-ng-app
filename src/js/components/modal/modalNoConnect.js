/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  angular
    .module('currencyApp')
    .component('noConnect', {
      templateUrl: './templates/noConnectTemplate.html',
      replace: true
    })
    .run(['$window', '$rootScope', function($window, $rootScope) {
      $rootScope.internetState = navigator.onLine;
      console.log(navigator.onLine);

      $window.addEventListener('offline', function() {
        $rootScope.$applyAsync(() => {
          $rootScope.internetState = false;
        });
      });

      $window.addEventListener('online', function() {
        $rootScope.$applyAsync(() => {
          $rootScope.internetState = true;
        });
      });
    }]);
})());