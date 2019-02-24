/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  function currencyController($scope, currencyService) {
    const vm = this;
    vm.currencyService = currencyService;

    function fetchData() {
      currencyService.getAllCurrencies().then(res => {
        $scope.allCurrencies = res.data.results;
        console.log(res.data.results);
      });
    }

    function fetchCurrenciesExchange() {
      if ($scope.haveCurrency && $scope.wantCurrency) {
        return currencyService.getCurrenciesExchange($scope.haveCurrency, $scope.wantCurrency);
      }
    }

    function renderExchangeRate() {
      return `Exchange rate: 1${$scope.haveCurrency} = ${$scope.currentCourse.toFixed(2)}${$scope.wantCurrency}`;
    }

    function setCurrenciesPair() {
      $scope.courseData.then(res => {
        const [currenciesPair] = Object.keys(res.data);
        console.log(currenciesPair);
        $scope.currentCourse = res.data[currenciesPair].val;
        $scope.exchangeRates = renderExchangeRate();
      });
    }

    $scope.changeHaveCyrrency = function(item) {
      $scope.haveCurrency = item;

      if ($scope.haveCurrency && $scope.wantCurrency) {
        $scope.courseData = fetchCurrenciesExchange();
        setCurrenciesPair();
      }
    };

    $scope.changeWantCyrrency = function(item) {
      $scope.wantCurrency = item;

      if ($scope.haveCurrency && $scope.wantCurrency) {
        $scope.courseData = fetchCurrenciesExchange();
        setCurrenciesPair();
      }
    };

    $scope.haveAmountChange = item => {
      $scope.wantAmount = (item * $scope.currentCourse).toFixed(2);
    };

    window.onload = fetchData;
    // $scope.click = fetchData;
  }

  angular
    .module('currencyApp')
    .controller('currencyController', currencyController);
})());