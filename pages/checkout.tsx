import { NextPage } from 'next';
import Shipping from '../src/components/Checkout/Shipping';

const CheckoutPage: NextPage = () => {
  return (
    <div className="checkout-page">
      <Shipping />
    </div>
  );
};

export default CheckoutPage;
