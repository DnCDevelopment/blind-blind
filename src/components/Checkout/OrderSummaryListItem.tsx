import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CartGoodsItemDetails from '../Cart/CartGoodsItemDetails';

import { currencyContext } from '../../context/currencyContext';

import { ICurrencyContext } from '../../context/Types';
import { IOrderSummaryListItemProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

import GiftSVG from '../../assets/svg/gift.svg';

const OrderSummaryListItem: React.FC<IOrderSummaryListItemProps> = ({
  price,
  amount,
  title,
  details,
  photo,
  receiverName,
}) => {
  const { locale } = useRouter();

  const { currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  return (
    <div className="order-summary-list-item">
      <div className="photo-box">
        <div className="amount">{amount}</div>
        {title && photo ? (
          <Image
            layout="fill"
            objectFit="contain"
            alt={title}
            loading="eager"
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
          />
        ) : (
          <GiftSVG />
        )}
      </div>
      <div className="info">
        {title && details ? (
          <>
            <p className="title">{title}</p>
            <CartGoodsItemDetails details={details} />
          </>
        ) : (
          <>
            <p className="title">
              {TRANSLATE[locale as 'ru' | 'en'].giftCertificateCartAbout}
              <span>{receiverName}</span>
            </p>
          </>
        )}
      </div>
      <p className="price">
        {(Number.parseFloat(price) / currencyRate).toFixed(2)} {currency}
      </p>
    </div>
  );
};

export default OrderSummaryListItem;
