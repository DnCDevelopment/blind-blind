import { useContext } from 'react';

import { currencyContext } from '../../context/currencyContext';

import { IPriceLabelProps } from './Types';
import { ICurrencyContext } from '../../context/Types';

const PriceLabel: React.FC<IPriceLabelProps> = ({ price, stockPrice }) => {
  const { currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  return (
    <div className="price-container">
      {stockPrice ? (
        <>
          <div className="old-price">
            {`${(Number.parseFloat(price) / currencyRate).toFixed(
              2
            )} ${currency}`}
          </div>
          <div className="stock-price">
            {`${(Number.parseFloat(stockPrice) / currencyRate).toFixed(
              2
            )} ${currency}`}
          </div>
        </>
      ) : (
        <div className="price">
          {`${(Number.parseFloat(price) / currencyRate).toFixed(
            2
          )} ${currency}`}
        </div>
      )}
    </div>
  );
};

export default PriceLabel;
