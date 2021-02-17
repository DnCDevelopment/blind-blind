import { GetServerSideProps, NextPage } from 'next';

import MainCart from '../src/components/Cart/MainCart';
import Seo from '../src/components/Seo/Seo';

import { ILocaleProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const CartPage: NextPage<ILocaleProps> = ({ locale }) => {
  return (
    <div className="cart-page">
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
      <MainCart />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: { locale },
});

export default CartPage;
