import Link from 'next/link';
import Image from 'next/image';

import PriceLabel from './PriceLabel';

import { IGoodsItemProps } from './Types';
import { TRANSLATE } from '../../constants/languages';
import { useRouter } from 'next/router';

const GoodsItem: React.FC<IGoodsItemProps> = ({
  title,
  link,
  photo,
  secondPhoto,
  price,
  stockPrice,
  isOutOfStock,
}) => {
  const { locale } = useRouter();

  return (
    <Link href={`/goods${link}`}>
      <div className={`goods-item ${isOutOfStock && 'not-in-stock'}`}>
        <div className={`goods-item__image`}>
          <Image
            layout="fill"
            objectFit="contain"
            className="collection-samples__goods-photos__preview"
            alt={title}
            loading="eager"
            quality={30}
            src={`${process.env.NEXT_PUBLIC_COCKPIT_URL}${photo}`}
          />

          {secondPhoto && (
            <div className="second">
              <Image
                layout="fill"
                objectFit="contain"
                alt={title}
                loading="eager"
                quality={20}
                src={`${process.env.NEXT_PUBLIC_COCKPIT_URL}${secondPhoto}`}
              />
            </div>
          )}
        </div>
        <div className="goods-item__title">{title}</div>
        {!isOutOfStock ? (
          <PriceLabel price={price} stockPrice={stockPrice} />
        ) : (
          <p>{TRANSLATE[locale as 'ru' | 'en'].outOfStock}</p>
        )}
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
