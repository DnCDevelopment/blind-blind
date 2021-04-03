import { NextPage, GetServerSideProps } from 'next';

import Error from '../_error';

import GoodsListTitle from '../../src/components/Goods/GoodsListTitle';
import GoodsSingle from '../../src/components/Goods/GoodsSingle';
import Seo from '../../src/components/Seo/Seo';

import { IGoodsPageProps } from '../../src/pagesTypes';
import { ICockpitGoodsRaw, ICockpitSize } from '../../src/cockpitTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

import { SEO_ITEMS, DEFAULT_DESCRIPTION } from '../../src/constants/seoItems';
import { LANGUAGES } from '../../src/constants/languages';

const SingleGoodsPage: NextPage<IGoodsPageProps> = ({
  goodsProps,
  subCollection,
  locale,
}) => {
  if (!goodsProps) return <Error />;

  const collectionLink =
    LANGUAGES[locale as 'ru' | 'en'].path +
    '/collections' +
    goodsProps.collectionLink;
  const goodLink =
    LANGUAGES[locale as 'ru' | 'en'].path + '/goods' + goodsProps.link;

  const breadcrumbs = [
    {
      title: SEO_ITEMS[locale].indexPage.breadcrumbName,
      link: SEO_ITEMS[locale].indexPage.link,
    },
    {
      title: goodsProps.collectionTitle,
      link: collectionLink,
    },
  ];

  if (subCollection) {
    const subCollectionLink =
      LANGUAGES[locale as 'ru' | 'en'].path +
      '/collections' +
      '/subcollections' +
      subCollection.link;
    breadcrumbs.push({
      title: subCollection.title,
      link: subCollectionLink,
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
            link: goodLink,
          },
        ]}
        lang={locale}
        path={process.env.NEXT_PUBLIC_SITE_URL + goodLink}
        product={{
          id: goodsProps.id,
          name: goodsProps.title,
          image: `/_next/image?url=${process.env.NEXT_PUBLIC_COCKPIT_URL}${goodsProps.photo}&w=1800&q=75`,
          price: goodsProps.price,
          collection: goodsProps.collectionTitle,
        }}
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
        sizes: (curGoods.sizes as ICockpitSize[])
          .map((size) => size.size)
          .filter((size) => size),
        photo: curGoods.previewImage.path,
        secondPhoto: curGoods.secondImage.path,
        otherPhotos: curGoods.otherImages,
        isExclusive: curGoods.isExclusive,
        collectionLink: curGoods.collection.link,
        collectionTitle:
          locale === defaultLocale
            ? curGoods.collection.title
            : curGoods.collection.title_en,
      }
    : null;

  const subCollection = {
    link: curGoods?.subCollection?.link,
    title:
      locale === defaultLocale
        ? curGoods?.subCollection?.title
        : curGoods?.subCollection?.title_en,
  };

  return {
    props: {
      locale,
      goodsProps,
      subCollection: curGoods?.subCollection ? subCollection : null,
    },
  };
};

export default SingleGoodsPage;
