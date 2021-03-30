import { GetServerSideProps, NextPage } from 'next';

import Voucher from '../src/components/Voucher/Voucher';
import Seo from '../src/components/Seo/Seo';

import { ILocaleProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const VoucherPage: NextPage<ILocaleProps> = ({ locale }) => (
  <div className="voucher-page">
    <Seo
      title={SEO_ITEMS[locale].voucherPage.title}
      description={SEO_ITEMS[locale].voucherPage.title}
      breadcrumbs={[
        {
          title: SEO_ITEMS[locale].voucherPage.breadcrumbName,
          link: SEO_ITEMS[locale].voucherPage.link,
        },
      ]}
      lang={locale}
      path={
        process.env.NEXT_PUBLIC_SITE_URL + SEO_ITEMS[locale].voucherPage.link
      }
    />
    <Voucher />
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: { locale },
});

export default VoucherPage;
