import { GetServerSideProps, NextPage } from 'next';

import Seo from '../src/components/Seo/Seo';
import Shipping from '../src/components/Checkout/Shipping';

import { ILocaleProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const CheckoutPage: NextPage<ILocaleProps> = ({ locale }) => (
  <div className="checkout-page">
    <Seo
      title={SEO_ITEMS[locale].cartPage.title}
      description={SEO_ITEMS[locale].cartPage.title}
      breadcrumbs={[
        {
          title: SEO_ITEMS[locale].cartPage.breadcrumbName,
          link: SEO_ITEMS[locale].cartPage.link,
        },
      ]}
      lang={locale}
      path={SEO_ITEMS[locale].cartPage.link}
    />
    <Shipping />
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: { locale },
});

export default CheckoutPage;
