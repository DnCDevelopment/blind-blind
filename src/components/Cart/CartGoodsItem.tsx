import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ICartGoodsItemProps } from './Types';

import { TRANSLATE } from '../../constants/languages';
import CartGoodsItemDetails from './CartGoodsItemDetails';
import { useContext } from 'react';
import { ICurrencyContext } from '../../context/Types';
import { currencyContext } from '../../context/currencyContext';

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
  const { currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  const currencyPrice = (Number.parseFloat(price) / currencyRate).toFixed(2);

  return (
    <tr className="cart-item">
      <td className="image-cell">
        <Link href={`/goods${link}`}>
          <div className="image-wrapper">
            <a>
              <Image
                layout="fill"
                objectFit="contain"
                alt={title}
                loading="eager"
                src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
              />
            </a>
          </div>
        </Link>
      </td>
      <td className="about-cell">
        <Link href={`/goods${link}`}>
          <a className="title">{title}</a>
        </Link>
        <CartGoodsItemDetails details={details} />
        <a role="presentation" className="remove-item" onClick={removeSelf}>
          {TRANSLATE[locale as 'ru' | 'en'].remove}
        </a>
      </td>
      <td className="price-cell">
        {amount} x {currencyPrice} {currency}
      </td>
      <td className="total-price-cell">
        {amount * Number.parseFloat(currencyPrice)} {currency}
      </td>
    </tr>
  );
};

export default CartGoodsItem;
