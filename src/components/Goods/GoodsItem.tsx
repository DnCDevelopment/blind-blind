import Link from 'next/link';

import PriceLabel from './PriceLabel';

import { IGoodsItemProps } from './Types';
import useImage from '../../hooks/useImage';

const GoodsItem: React.FC<IGoodsItemProps> = ({
  title,
  link,
  photo,
  secondPhoto,
  price,
  stockPrice,
}) => {
  const { img, isLoad, onLoad } = useImage();

  return (
    <Link href={`/goods${link}`}>
      <div className="goods-item">
        <div
          className={`goods-item-fallback__image ${
            isLoad ? 'not-load' : 'load'
          }`}
        />
        <div className={`goods-item__image ${isLoad ? 'load' : 'not-load'}`}>
          <img
            ref={img}
            src={`/_next/image?url=${process.env.NEXT_PUBLIC_COCKPIT_URL}${photo}&w=1800&q=50`}
            alt={title}
            onLoad={onLoad}
          />
          <img
            className="second"
            src={`/_next/image?url=${process.env.NEXT_PUBLIC_COCKPIT_URL}${secondPhoto}&w=1800&q=50`}
            alt={title}
          />
        </div>
        <div className="goods-item__title">{title}</div>
        <PriceLabel price={price} stockPrice={stockPrice} />
      </div>
    </Link>
  );
};

export const GoodsItemFallback = () => {
  return (
    <div className="goods-item-fallback">
      <div className="goods-item-fallback__image" />
      <div className="goods-item-fallback__title" />
      <div className="goods-item-fallback__price" />
    </div>
  );
};

export default GoodsItem;
