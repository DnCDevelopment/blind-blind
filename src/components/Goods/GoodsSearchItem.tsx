import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { currencyContext } from '../../context/currencyContext';
import { ICurrencyContext } from '../../context/Types';
import { IGoodsSearchItemProps } from './Types';

const GoodsSearchItem: React.FC<IGoodsSearchItemProps> = ({
  photo,
  title,
  link,
  price,
}) => {
  const { currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  return (
    <Link href={'/goods' + link}>
      <div className="goods-search-item">
        <div className="goods-search-item__image">
          <Image
            layout="fill"
            objectFit="contain"
            alt={title}
            objectPosition="left"
            loading="eager"
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
          />
        </div>
        <div className="goods-search-item__info">
          <p>{title}</p>
          <p>
            {(Number.parseFloat(price) / currencyRate).toFixed(2)} {currency}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GoodsSearchItem;
