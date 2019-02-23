/*  eslint-disable no-console*/
/* globals currencyApp */
((function() {
  function currencyService($http, CURRENCY_API_URL, CURRENCY_CONVERT_API_URL, CURRENCY_API_KEY) {
    function getAllCurrencies() {
      const URL = `${CURRENCY_API_URL}?apiKey=${CURRENCY_API_KEY}`;

      return $http.get(URL);
    }

    function getCurrenciesExchange(firstCurrency, secondCurrency) {
      const URL = `${CURRENCY_CONVERT_API_URL}?apiKey=${CURRENCY_API_KEY}&q=${firstCurrency}_${secondCurrency}&compact=y`;

      return $http.get(URL);
    }

    return {
      getAllCurrencies,
      getCurrenciesExchange
    };
  }

  currencyApp.factory('currencyService', currencyService);
})());