import { GetServerSideProps, NextPage } from 'next';

import GoodsList from '../src/components/Goods/GoodsList';
import GoodsListTitle from '../src/components/Goods/GoodsListTitle';
import Seo from '../src/components/Seo/Seo';

import { ISalesPageProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';
import { getCockpitCollection } from '../src/utils/getCockpitData';
import {
  ICockpitCategoriesEntries,
  ICockpitGoodsRaw,
} from '../src/cockpitTypes';

const SalesPage: NextPage<ISalesPageProps> = ({
  locale,
  goods,
  categories,
}) => {
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
        path={
          process.env.NEXT_PUBLIC_SITE_URL + SEO_ITEMS[locale].salesPage.link
        }
      />
      <GoodsListTitle />
      <div className="goods-container">
        <GoodsList categories={categories} goods={goods} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const goods = await getCockpitCollection(
    'Goods',
    'filter[stockPrice][$exists]=true'
  );
  const cockpitCategoriesData: ICockpitCategoriesEntries = await getCockpitCollection(
    'Categories'
  );
  const categories = cockpitCategoriesData.entries.map((category) => ({
    ...category,
    title: locale === defaultLocale ? category.title : category.title_en,
  }));
  return {
    props: {
      locale,
      categories,
      goods: {
        entries: goods.entries.filter(
          ({ stockPrice, isVisible }: ICockpitGoodsRaw) =>
            stockPrice && isVisible !== false
        ),
      },
    },
  };
};

export default SalesPage;
