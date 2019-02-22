/* eslint-disable no-console */
console.log('test');
/* globals angular */
const currencyApp = angular.module('currencyApp', ['ui.bootstrap']);

currencyApp.controller('currencyCtrl', ['$scope', function($scope) {
  $scope.inputValue = 'Field value';
}]);