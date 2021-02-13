import Image from 'next/image';
import Link from 'next/link';
import { IGoodsSearchItemProps } from './Types';

const GoodsSearchItem: React.FC<IGoodsSearchItemProps> = ({
  photo,
  title,
  link,
  price,
}) => {
  return (
    <Link href={'/goods' + link}>
      <div className="goods-search-item">
        <div className="goods-search-item__image">
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="left"
            loading="eager"
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
          />
        </div>
        <div className="goods-search-item__info">
          <p>{title}</p>
          <p>{price}₴</p>
        </div>
      </div>
    </Link>
  );
};

export default GoodsSearchItem;
