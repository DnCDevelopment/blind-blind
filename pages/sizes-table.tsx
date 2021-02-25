import { GetServerSideProps, NextPage } from 'next';

import SizesTable from '../src/components/SizesTable/SizesTable';
import Seo from '../src/components/Seo/Seo';

import { ILocaleProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const SizesTablePage: NextPage<ILocaleProps> = ({ locale }) => {
  return (
    <div className="voucher-page">
      <Seo
        title={SEO_ITEMS[locale].sizeTablePage.title}
        description={SEO_ITEMS[locale].sizeTablePage.title}
        breadcrumbs={[
          {
            title: SEO_ITEMS[locale].sizeTablePage.breadcrumbName,
            link: SEO_ITEMS[locale].sizeTablePage.link,
          },
        ]}
        lang={locale}
        path={SEO_ITEMS[locale].sizeTablePage.link}
      />
      <SizesTable />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: { locale },
});

export default SizesTablePage;
