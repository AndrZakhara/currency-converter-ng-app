/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  function currencyController($scope, currencyService) {
    const vm = this;

    function renderExchangeRate() {
      return `Exchange rate: 1${$scope.haveCurrency} = ${$scope.currentCourse.toFixed(2)}${$scope.wantCurrency}`;
    }

    function fetchCurrenciesExchange() {
      if ($scope.haveCurrency && $scope.wantCurrency) {
        currencyService.getCurrenciesExchange($scope.haveCurrency, $scope.wantCurrency)
          .then(res => {
            const [currenciesPair] = Object.keys(res.data);
            $scope.currentCourse = res.data[currenciesPair].val;
            $scope.exchangeRates = renderExchangeRate();
            $scope.haveAmountChange();
          });
      }
    }

    function fetchData() {
      currencyService.getAllCurrencies().then(res => {
        $scope.allCurrencies = res.data.results;
        fetchCurrenciesExchange();
      });
    }

    $scope.currencyService = currencyService;

    $scope.commissionOptions = [
      {
        name: 'Commission - 0%',
        value: 0
      },
      {
        name: 'Commission - 1%',
        value: 1
      },
      {
        name: 'Commission - 1.5%',
        value: 1.5
      },
      {
        name: 'Commission - 2.5%',
        value: 2.5
      },
      {
        name: 'Commission - 4%',
        value: 4
      }
    ];

    $scope.selectedCommission = $scope.commissionOptions[0];
    $scope.haveCurrency = 'USD';
    $scope.wantCurrency = 'UAH';

    $scope.swapCurrencies = () => {
      const { haveCurrency, wantCurrency } = $scope;

      $scope.haveAmount = 0;
      $scope.wantAmount = 0;
      $scope.haveCurrency = wantCurrency;
      $scope.wantCurrency = haveCurrency;
      $scope.selectedCommission = $scope.commissionOptions[0];

      fetchCurrenciesExchange();
    };

    $scope.changeHaveCyrrency = function() {
      if ($scope.haveCurrency && $scope.wantCurrency) {
        fetchCurrenciesExchange();
      }
    };

    $scope.changeWantCyrrency = function() {
      if ($scope.haveCurrency && $scope.wantCurrency) {
        fetchCurrenciesExchange();
      }
    };

    $scope.haveAmountChange = () => {
      const {
        haveAmount,
        currentCourse,
        selectedCommission,
        haveCurrency,
        wantCurrency
      } = $scope;

      if (
        haveAmount
        && haveCurrency
        && wantCurrency
        && currentCourse
      ) {
        $scope.wantAmount = Number((haveAmount * currentCourse * (1 + selectedCommission.value / 100)).toFixed(2));
      } else {
        $scope.wantAmount = 0;
      }
    };

    $scope.changeCommission = val => {
      $scope.haveAmountChange();
    };

    window.onload = fetchData;
  }

  angular
    .module('currencyApp')
    .controller('currencyController', currencyController);
})());