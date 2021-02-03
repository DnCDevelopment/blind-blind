import { NextPage } from 'next';
import MainCart from '../src/components/Cart/MainCart';

const SalesPage: NextPage = () => {
  return (
    <div className="cart-page">
      <MainCart />
    </div>
  );
};

export default SalesPage;
