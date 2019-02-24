/* eslint-disable no-console */
/* globals angular */
(function() {
  window.currencyApp = angular
    .module('currencyApp', ['ui.bootstrap'])
    .constant('CURRENCY_API_URL', 'https://free.currencyconverterapi.com/api/v6/currencies')
    .constant('CURRENCY_CONVERT_API_URL', 'https://free.currencyconverterapi.com/api/v6/convert')
    .constant('CURRENCY_API_KEY', '8dd10bee3025f77fa7da');
}());
/*  eslint-disable no-console*/
/* globals currencyApp */
((function() {
  function currencyService($http, CURRENCY_API_URL, CURRENCY_CONVERT_API_URL, CURRENCY_API_KEY) {
    function getAllCurrencies() {
      const URL = `${CURRENCY_API_URL}?apiKey=${CURRENCY_API_KEY}`;

      return $http.get(URL);
    }

    function getCurrenciesExchange(firstCurrency, secondCurrency) {
      const mainURL = `${CURRENCY_CONVERT_API_URL}?apiKey=${CURRENCY_API_KEY}`;
      const URL = `${mainURL}&q=${firstCurrency}_${secondCurrency}&compact=y`;

      return $http.get(URL);
    }

    return {
      getAllCurrencies,
      getCurrenciesExchange
    };
  }

  currencyApp.factory('currencyService', currencyService);
})());

/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  function currencyController($scope, currencyService) {
    const vm = this;

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

    $scope.selectedcommission = $scope.commissionOptions[0];

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

    $scope.haveAmountChange = () => {
      const {
        haveAmount,
        currentCourse,
        selectedcommission,
        haveCurrency,
        wantCurrency
      } = $scope;

      if (
        haveAmount
        && haveCurrency
        && wantCurrency
      ) {
        $scope.wantAmount = (haveAmount * currentCourse * (1 + selectedcommission.value / 100)).toFixed(2);
      } else {
        $scope.wantAmount = null;
      }
    };

    $scope.changeCommission = val => {
      $scope.haveAmountChange();
    };

    // window.onload = fetchData;
    // $scope.click = fetchData;
  }

  angular
    .module('currencyApp')
    .controller('currencyController', currencyController);
})());