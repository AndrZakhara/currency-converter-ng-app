/* eslint-disable no-console */
/* globals currencyApp angular */
angular
  .module('currencyApp')
  .controller('TabController', ['$scope', function($scope) {
    $scope.tab = 1;

    $scope.isSet = tabNum => $scope.tab === tabNum;

    $scope.setTab = newTab => {
      $scope.tab = newTab;
    };

    $scope.handleTabClick = val => {
      $scope.setTab(val);
      $scope.setLabel(val);
    };
  }]);