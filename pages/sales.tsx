import { GetServerSideProps, NextPage } from 'next';
import { Suspense } from 'react';

import GoodsList, {
  GoodsListFallback,
} from '../src/components/Goods/GoodsList';
import GoodsListTitle from '../src/components/Goods/GoodsListTitle';
import Seo from '../src/components/Seo/Seo';

import { ILocaleProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const SalesPage: NextPage<ILocaleProps> = ({ locale }) => {
  const isServer = typeof window === 'undefined';
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
        {isServer ? (
          <GoodsList filter={`filter[stockPrice][$exists]=true`} />
        ) : (
          <Suspense fallback={<GoodsListFallback />}>
            <GoodsList filter={`filter[stockPrice][$exists]=true`} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: { locale },
});

export default SalesPage;
