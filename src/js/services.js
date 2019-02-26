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