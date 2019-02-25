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
    $scope.selectLeft = 'Currency I Have:';
    $scope.selectRight = 'Currency I Want:';

    $scope.setLabel = val => {
      if (val === 1) {
        $scope.selectLeft = 'Currency I Have:';
        $scope.selectRight = 'Currency I Want:';
      } else {
        $scope.selectLeft = 'Currency I Want:';
        $scope.selectRight = 'Currency I Need:';
      }
    };

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
    .controller('CurrencyController', currencyController);
})());
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