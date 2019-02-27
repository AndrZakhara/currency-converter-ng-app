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
    .controller('CurrencyController', currencyController)
    .component('currencyApp', {
      templateUrl: 'converterTemplate.html',
      replace: true
    });
})());