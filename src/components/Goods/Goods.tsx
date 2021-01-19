import Image from 'next/image';
import Link from 'next/link';
import { IGoodsProps } from './Types';

const Goods: React.FC<IGoodsProps> = ({ title, link, photo }) => {
  return (
    <div className="goods">
      <Link href={link}>
        <Image
          className="goods__image"
          layout="fill"
          objectFit="cover"
          loading="eager"
          src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
        />
        <div className="goods__title">{title}</div>
      </Link>
    </div>
  );
};

export const GoodsFallback = () => {
  return (
    <div className="goods-fallback">
      <div className="goods-fallback__photo" />
      <div className="goods-fallback__title" />
    </div>
  );
};

export default Goods;
