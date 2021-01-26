import { IPriceLabelProps } from './Types';

const PriceLabel: React.FC<IPriceLabelProps> = ({ price, stockPrice }) => {
  return (
    <div className="price-container">
      {stockPrice ? (
        <>
          <div className="old-price">{price} UAH</div>
          <div className="stock-price">{stockPrice} UAH</div>
        </>
      ) : (
        <div className="price">{price} UAH</div>
      )}
    </div>
  );
};

export default PriceLabel;
