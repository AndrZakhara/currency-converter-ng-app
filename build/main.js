/* eslint-disable no-console */
/* globals angular */
(function() {
  window.currencyApp = angular
    .module('currencyApp', ['ui.bootstrap'])
    .constant('CURRENCY_API_URL', 'https://free.currencyconverterapi.com/api/v6/currencies')
    .constant('CURRENCY_CONVERT_API_URL', 'https://free.currencyconverterapi.com/api/v6/convert')
    .constant('CURRENCY_API_KEY', '8dd10bee3025f77fa7da')
    .constant('FEE', '[0, 1, 1.5, 2.5, 4]')
    .constant('CURRENCY_FROM', 'USD')
    .constant('CURRENCY_TO', 'UAH')
    .constant('LABEL_FROM', 'Currency I Have:')
    .constant('LABEL_TO', 'Currency I Want:')
    .constant('LABEL_TO_NEED', 'Currency I Need:');
}());
/*  eslint-disable no-console*/
/* globals currencyApp */
((function() {
  function currencyService($http, CURRENCY_API_URL, CURRENCY_CONVERT_API_URL, CURRENCY_API_KEY, FEE) {
    function getAllCurrencies() {
      const URL = `${CURRENCY_API_URL}?apiKey=${CURRENCY_API_KEY}`;

      return $http.get(URL).then(res => res.data.results);
    }

    function getCurrenciesExchange(firstCurrency, secondCurrency) {
      const mainURL = `${CURRENCY_CONVERT_API_URL}?apiKey=${CURRENCY_API_KEY}`;
      const URL = `${mainURL}&q=${firstCurrency}_${secondCurrency}&compact=y`;

      return $http.get(URL).then(res => {
        const [currenciesPair] = Object.keys(res.data);

        return res.data[currenciesPair].val;
      });
    }

    function getFee() {
      const feeArr = [];
      JSON.parse(FEE).forEach(value => {
        feeArr.push(
          {
            name: `Commission - ${value}%`,
            value
          }
        );
      });

      return feeArr;
    }

    return {
      getAllCurrencies,
      getCurrenciesExchange,
      getFee
    };
  }

  currencyApp.factory('currencyService', currencyService);
})());
/* eslint-disable no-console */
/* globals currencyApp angular */
((function() {
  function currencyController($scope, CURRENCY_FROM, CURRENCY_TO, LABEL_FROM, LABEL_TO, LABEL_TO_NEED, currencyService) {
    const vm = this;

    function renderExchangeRate() {
      return `Exchange rate: 1${vm.fromCurrency} = ${vm.currentCourse.toFixed(2)}${vm.toCurrency}`;
    }

    function fetchCurrenciesExchange() {
      if (vm.fromCurrency && vm.toCurrency) {
        currencyService.getCurrenciesExchange(vm.fromCurrency, vm.toCurrency)
          .then(rate => {
            vm.currentCourse = rate;
            vm.exchangeRateHeader = renderExchangeRate();
            vm.fromAmountChange();
          });
      }
    }

    function fetchCurrenciesList() {
      currencyService.getAllCurrencies().then(list => {
        vm.allCurrencies = list;
        fetchCurrenciesExchange();
        vm.commissionOptions = currencyService.getFee();
        vm.selectedCommission = vm.commissionOptions[0];
      });
    }

    vm.currencyService = currencyService;
    vm.fromCurrency = CURRENCY_FROM;
    vm.toCurrency = CURRENCY_TO;
    vm.selectLeft = LABEL_FROM;
    vm.selectRight = LABEL_TO;
    vm.isSell = true;

    $scope.handleTab = val => {
      if (val === 1) {
        vm.selectLeft = LABEL_FROM;
        vm.selectRight = LABEL_TO;
        vm.isSell = true;
      } else {
        vm.selectLeft = LABEL_TO;
        vm.selectRight = LABEL_TO_NEED;
        vm.isSell = false;
      }
      vm.fromAmountChange();
    };

    vm.swapCurrencies = () => {
      const { fromCurrency, toCurrency, commissionOptions } = vm;

      vm.fromAmount = 0;
      vm.toAmount = 0;
      vm.fromCurrency = toCurrency;
      vm.toCurrency = fromCurrency;
      vm.selectedCommission = commissionOptions[0];

      fetchCurrenciesExchange();
    };

    vm.changeFromCyrrency = function() {
      if (vm.fromCurrency && vm.toCurrency) {
        fetchCurrenciesExchange();
      }
    };

    vm.changeToCyrrency = function() {
      if (vm.fromCurrency && vm.toCurrency) {
        fetchCurrenciesExchange();
      }
    };

    vm.fromAmountChange = () => {
      const {
        fromAmount,
        currentCourse,
        selectedCommission,
        fromCurrency,
        toCurrency
      } = vm;

      if (
        fromAmount
        && fromCurrency
        && toCurrency
        && currentCourse
      ) {
        vm.toAmount = vm.isSell
          ? Number((fromAmount * currentCourse * (1 - selectedCommission.value / 100)).toFixed(2))
          : Number((fromAmount * currentCourse * (1 + selectedCommission.value / 100)).toFixed(2));
      } else {
        vm.toAmount = 0;
      }
    };

    vm.changeCommission = val => {
      vm.fromAmountChange();
    };

    window.onload = fetchCurrenciesList;
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
      $scope.handleTab(val);
    };
  }]);