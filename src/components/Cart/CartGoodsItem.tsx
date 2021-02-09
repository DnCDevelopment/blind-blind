import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ICartGoodsItemProps } from './Types';

import { TRANSLATE } from '../../constants/languages';
import CartGoodsItemDetails from './CartGoodsItemDetails';

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
      <td className="image-cell">
        <Link href={`/goods${link}`}>
          <div className="image-wrapper">
            <a>
              <Image
                layout="fill"
                objectFit="contain"
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
        {amount} x {price} UAH
      </td>
      <td className="total-price-cell">
        {amount * Number.parseFloat(price)} UAH
      </td>
    </tr>
  );
};

export default CartGoodsItem;
