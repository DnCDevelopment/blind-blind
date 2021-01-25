import Image from 'next/image';
import Link from 'next/link';
import { IGoodsItemProps } from './Types';

const GoodsItem: React.FC<IGoodsItemProps> = ({
  title,
  link,
  photo,
  secondPhoto,
  price,
  stockPrice,
}) => {
  return (
    <div className="goods-item">
      <Link href={link}>
        <>
          <div className="goods-item__image">
            <Image
              layout="fill"
              objectFit="cover"
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
            />
            <Image
              className="second"
              layout="fill"
              objectFit="cover"
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + secondPhoto}
            />
          </div>
          <div className="goods-item__title">{title}</div>
          <div className="goods-item__price-container">
            {stockPrice ? (
              <>
                <div className="old-price">{price} UAH</div>
                <div className="stock-price">{stockPrice} UAH</div>
              </>
            ) : (
              <div className="price">{price} UAH</div>
            )}
          </div>
        </>
      </Link>
    </div>
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
