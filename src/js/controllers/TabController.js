/* eslint-disable no-console */
/* globals currencyApp angular */
angular
  .module('currencyApp')
  .controller('TabController', ['$scope', function($scope) {
    const vm = this;
    vm.tab = 1;

    vm.isSet = tabNum => vm.tab === tabNum;

    vm.setTab = newTab => {
      vm.tab = newTab;
    };

    vm.handleTabClick = val => {
      vm.setTab(val);
      $scope.setLabel(val);
    };
  }]);