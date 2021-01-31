import { TRANSLATE } from '../../constants/languages';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ICartGoodsItemProps } from './Types';
import { string } from 'yup/lib/locale';

const CartGoodsItem: React.FC<ICartGoodsItemProps> = ({
  title,
  link,
  photo,
  price,
  details,
  amount,
  removeSelf,
}) => {
  const { locale } = useRouter();

  return (
    <tr className="cart-goods-item">
      <td className="cart-goods-item__image">
        <Link href={`/goods${link}`}>
          <a>
            <Image
              layout="fill"
              objectFit="contain"
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
            />
          </a>
        </Link>
      </td>
      <td className="cart-goods-item__about">
        <Link href={`/goods${link}`}>
          <a className="title">{title}</a>
        </Link>
        <p className="details">
          {typeof details == 'string' ? details : JSON.stringify(details)}
        </p>
        <a role="presentation" className="remove-item" onClick={removeSelf}>
          {TRANSLATE[locale as 'ru' | 'en'].remove}
        </a>
      </td>
      <td className="cart-goods-item__price">
        {amount} x {price} UAH
      </td>
      <td className="cart-goods-item__total-price">
        {amount * Number.parseFloat(price)} UAH
      </td>
    </tr>
  );
};

export default CartGoodsItem;
