import { useContext, useState } from 'react';

import { currencyContext } from '../../context/currencyContext';

import { ECurrency, ICurrencyContext } from '../../context/Types';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useContext(
    currencyContext
  ) as ICurrencyContext;

  const [droplistOpen, setDroplistOpen] = useState<boolean>(false);

  return (
    <div className="dropdown-selector">
      <p role="presentation" onClick={() => setDroplistOpen(!droplistOpen)}>
        {currency}
      </p>
      {droplistOpen && (
        <div className="droplist">
          {Object.keys(ECurrency)
            .filter((curr) => isNaN(Number(curr)))
            .map((curr) => (
              <p
                role="presentation"
                key={curr}
                onClick={() => {
                  setDroplistOpen(false);
                  setCurrency((curr as unknown) as ECurrency);
                }}
              >
                {curr}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
