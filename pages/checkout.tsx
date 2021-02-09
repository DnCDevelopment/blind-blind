import { GetServerSideProps, NextPage } from 'next';
import { ICockpitPromocode } from '../src/cockpitTypes';
import Shipping from '../src/components/Checkout/Shipping';
import { ICheckoutPageProps } from '../src/pagesTypes';
import { getCockpitCollection } from '../src/utils/getCockpitData';

const CheckoutPage: NextPage<ICheckoutPageProps> = ({ promocodes }) => {
  return (
    <div className="checkout-page">
      <Shipping promocodes={promocodes} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const cockpitPromocodes = await getCockpitCollection('Promocodes');

  const promocodes = cockpitPromocodes.entries.map(
    ({ code, discount, inPercent }: ICockpitPromocode) => {
      return {
        code,
        discount,
        inPercent,
      };
    }
  );

  return {
    props: { promocodes },
  };
};

export default CheckoutPage;
