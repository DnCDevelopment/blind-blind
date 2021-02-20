import { useRouter } from 'next/router';
import { ICartVoucherItemProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

const CartVoucherItem: React.FC<ICartVoucherItemProps> = ({
  receiverName,
  price,
  removeSelf,
}) => {
  const { locale } = useRouter();

  return (
    <tr className="cart-item">
      <td className="image-cell"></td>
      <td className="about-cell">
        <p>
          {TRANSLATE[locale as 'ru' | 'en'].giftCertificateCartAbout}
          <span>{receiverName}</span>
        </p>
        <a role="presentation" className="remove-item" onClick={removeSelf}>
          {TRANSLATE[locale as 'ru' | 'en'].remove}
        </a>
      </td>
      <td className="price-cell"></td>
      <td className="total-price-cell">{price} UAH</td>
    </tr>
  );
};

export default CartVoucherItem;
