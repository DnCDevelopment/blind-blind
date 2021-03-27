import { GetServerSideProps, NextPage } from 'next';

import GoodsList from '../src/components/Goods/GoodsList';
import GoodsListTitle from '../src/components/Goods/GoodsListTitle';
import Seo from '../src/components/Seo/Seo';

import { ISalesPageProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';
import { getCockpitCollection } from '../src/utils/getCockpitData';

const SalesPage: NextPage<ISalesPageProps> = ({ locale, goods }) => {
  return (
    <div className="sales-page">
      <Seo
        title={SEO_ITEMS[locale].salesPage.title}
        description={SEO_ITEMS[locale].salesPage.title}
        breadcrumbs={[
          {
            title: SEO_ITEMS[locale].indexPage.breadcrumbName,
            link: SEO_ITEMS[locale].indexPage.link,
          },
          {
            title: SEO_ITEMS[locale].salesPage.breadcrumbName,
            link: SEO_ITEMS[locale].salesPage.link,
          },
        ]}
        lang={locale}
        path={SEO_ITEMS[locale].salesPage.link}
      />
      <GoodsListTitle />
      <div className="goods-container">
        <GoodsList goods={goods} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const goods = await getCockpitCollection(
    'Goods',
    'filter[stockPrice][$exists]=true'
  );
  return {
    props: { locale },
    goods,
  };
};

export default SalesPage;
