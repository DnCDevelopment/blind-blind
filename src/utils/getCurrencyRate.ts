export const getCurrencyRate = async (currency: string) => {
  const rates = fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  )
    .then((res) => res.json())
    .then((currencies) => {
      const appropriateCurrency = currencies.filter(
        ({ cc }: { cc: string }) => cc == currency
      );
      return appropriateCurrency.length ? appropriateCurrency[0].rate - 4 : 1;
    })
    .catch((e) => console.error(e));

  return rates;
};
