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
      return `Exchange rate: 1${vm.haveCurrency} = ${vm.currentCourse.toFixed(2)}${vm.wantCurrency}`;
    }

    function fetchCurrenciesExchange() {
      if (vm.haveCurrency && vm.wantCurrency) {
        currencyService.getCurrenciesExchange(vm.haveCurrency, vm.wantCurrency)
          .then(res => {
            const [currenciesPair] = Object.keys(res.data);
            vm.currentCourse = res.data[currenciesPair].val;
            vm.exchangeRates = renderExchangeRate();
            vm.haveAmountChange();
          });
      }
    }

    function fetchData() {
      currencyService.getAllCurrencies().then(res => {
        vm.allCurrencies = res.data.results;
        fetchCurrenciesExchange();
      });
    }

    vm.currencyService = currencyService;

    vm.commissionOptions = [
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

    vm.selectedCommission = vm.commissionOptions[0];
    vm.haveCurrency = 'USD';
    vm.wantCurrency = 'UAH';
    vm.selectLeft = 'Currency I Have:';
    vm.selectRight = 'Currency I Want:';

    $scope.setLabel = val => {
      if (val === 1) {
        vm.selectLeft = 'Currency I Have:';
        vm.selectRight = 'Currency I Want:';
      } else {
        vm.selectLeft = 'Currency I Want:';
        vm.selectRight = 'Currency I Need:';
      }
    };

    vm.swapCurrencies = () => {
      const { haveCurrency, wantCurrency } = vm;

      vm.haveAmount = 0;
      vm.wantAmount = 0;
      vm.haveCurrency = wantCurrency;
      vm.wantCurrency = haveCurrency;
      vm.selectedCommission = vm.commissionOptions[0];

      fetchCurrenciesExchange();
    };

    vm.changeHaveCyrrency = function() {
      if (vm.haveCurrency && vm.wantCurrency) {
        fetchCurrenciesExchange();
      }
    };

    vm.changeWantCyrrency = function() {
      if (vm.haveCurrency && vm.wantCurrency) {
        fetchCurrenciesExchange();
      }
    };

    vm.haveAmountChange = () => {
      const {
        haveAmount,
        currentCourse,
        selectedCommission,
        haveCurrency,
        wantCurrency
      } = vm;

      if (
        haveAmount
        && haveCurrency
        && wantCurrency
        && currentCourse
      ) {
        vm.wantAmount = Number((haveAmount * currentCourse * (1 - selectedCommission.value / 100)).toFixed(2));
      } else {
        vm.wantAmount = 0;
      }
    };

    vm.changeCommission = val => {
      vm.haveAmountChange();
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