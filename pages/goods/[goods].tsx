import { NextPage, GetServerSideProps } from 'next';

import GoodsListTitle from '../../src/components/Goods/GoodsListTitle';
import GoodsSingle from '../../src/components/Goods/GoodsSingle';
import Error from '../_error';
import Seo from '../../src/components/Seo/Seo';

import { IGoodsPageProps } from '../../src/pagesTypes';
import { ICockpitGoodsRaw, ICockpitSize } from '../../src/cockpitTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

import { SEO_ITEMS, DEFAULT_DESCRIPTION } from '../../src/constants/seoItems';

const SingleGoodsPage: NextPage<IGoodsPageProps> = ({
  goodsProps,
  collection,
  subCollection,
  locale,
}) => {
  if (!goodsProps) return <Error />;

  const breadcrumbs = [
    {
      title: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.breadcrumbName,
      link: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.link,
    },
    {
      title: collection.title,
      link: collection.link,
    },
  ];

  if (subCollection) {
    breadcrumbs.push({
      title: subCollection.title,
      link: subCollection.link,
    });
  }

  return (
    <div className="goods-page">
      <Seo
        title={goodsProps.title}
        description={goodsProps.description || DEFAULT_DESCRIPTION[locale]}
        breadcrumbs={[
          ...breadcrumbs,
          {
            title: goodsProps.title as string,
            link: goodsProps.link as string,
          },
        ]}
        lang={locale as 'ru' | 'en'}
        path={goodsProps.link as string}
      />
      <GoodsListTitle />
      <GoodsSingle {...goodsProps} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
  query,
}) => {
  const filter = `filter[link]=/${query.goods}&populate=1`;
  const goodsData = await getCockpitCollection('Goods', filter);
  const curGoods: ICockpitGoodsRaw = goodsData.total
    ? goodsData.entries[0]
    : null;

  const goodsProps = curGoods
    ? {
        id: curGoods._id,
        title: locale === defaultLocale ? curGoods.title : curGoods.title_en,
        link: curGoods.link,
        description:
          locale === defaultLocale
            ? curGoods.description
            : curGoods.description_en,
        materials:
          locale === defaultLocale ? curGoods.consist : curGoods.consist_en,
        price: curGoods.price,
        stockPrice: curGoods.stockPrice,
        sizes: (curGoods.sizes as ICockpitSize[]).map((size) => size.size),
        photo: curGoods.previewImage.path,
        secondPhoto: curGoods.secondImage.path,
        otherPhotos: curGoods.otherImages,
        isExclusive: curGoods.isExclusive,
        collectionLink: curGoods.collection.link,
      }
    : null;

  const collection = {
    link:
      locale === defaultLocale
        ? curGoods.collection.link
        : curGoods.collection.link_en,
    title:
      locale === defaultLocale
        ? curGoods.collection.title
        : curGoods.collection.title_en,
  };

  const subCollection = {
    link:
      locale === defaultLocale
        ? curGoods?.subCollection?.link
        : curGoods?.subCollection?.link_en,
    title:
      locale === defaultLocale
        ? curGoods?.subCollection?.title
        : curGoods?.subCollection?.title_en,
  };

  return {
    props: {
      locale,
      goodsProps,
      collection,
      subCollection: curGoods?.subCollection ? subCollection : null,
    },
  };
};

export default SingleGoodsPage;
