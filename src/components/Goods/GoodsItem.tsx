import Image from 'next/image';
import Link from 'next/link';
import { IGoodsItemProps } from './Types';

const GoodsItem: React.FC<IGoodsItemProps> = ({ title, link, photo }) => {
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
          </div>
          <div className="goods-item__title">{title}</div>
        </>
      </Link>
    </div>
  );
};

export const GoodsItemFallback = () => {
  return (
    <div className="goods-fallback">
      <div className="goods-fallback__photo" />
      <div className="goods-fallback__title" />
    </div>
  );
};

export default GoodsItem;
