import Image from 'next/image';
import CartGoodsItemDetails from '../Cart/CartGoodsItemDetails';
import { ICartGoodsItemProps } from '../Cart/Types';

const OrderSummaryListItem: React.FC<ICartGoodsItemProps> = ({
  photo,
  title,
  amount,
  price,
  details,
}) => {
  return (
    <div className="order-summary-list-item">
      <div className="photo-box">
        <div className="amount">{amount}</div>
        <Image
          layout="fill"
          objectFit="contain"
          loading="eager"
          src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
        />
      </div>
      <div className="info">
        <p className="title">{title}</p>
        <CartGoodsItemDetails details={details} />
      </div>
      <p className="price">{price}₴</p>
    </div>
  );
};

export default OrderSummaryListItem;
