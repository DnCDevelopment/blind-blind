import { NextPage, GetServerSideProps } from 'next';

import Error from '../_error';

import GoodsListTitle from '../../src/components/Goods/GoodsListTitle';
import GoodsSingle from '../../src/components/Goods/GoodsSingle';
import Seo from '../../src/components/Seo/Seo';

import { IGoodsPageProps } from '../../src/pagesTypes';
import { ICockpitGoodsRaw } from '../../src/cockpitTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

import { SEO_ITEMS, DEFAULT_DESCRIPTION } from '../../src/constants/seoItems';
import { LANGUAGES } from '../../src/constants/languages';
import { IMoySkladGoodData, IMoySkladStockData } from '../../src/moySkladTypes';
import getMoySkladData from '../../src/utils/getMoySkladData';

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

  const moySkladGoods = await getMoySkladData<IMoySkladGoodData>(
    `remap/1.2/entity/variant?filter=code~=${query.goods}`
  );

  const ids: string[] = [];
  const stockPromises = moySkladGoods?.rows.map(({ id }) => {
    ids.push(id);
    return getMoySkladData<IMoySkladStockData>(
      `remap/1.2/report/stock/all?filter=variant=https://online.moysklad.ru/api/remap/1.2/entity/variant/${id}&stockMode=positiveOnly`
    );
  });
  const data = await Promise.all(stockPromises);
  const availableIds = data
    .map((item, idx) => {
      return Array.isArray(item.rows) && item.rows.length ? ids[idx] : false;
    })
    .filter((id) => id);

  const sizes = moySkladGoods?.rows
    .filter(({ id }) => availableIds.includes(id))
    .map((row) => {
      const sizes = row.characteristics
        .filter((c) => c.name === 'Размер')
        .map((c) => c.value);
      return sizes.length && sizes[0];
    })
    .filter((size) => size) as string[];

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
        sizes: [...new Set(sizes)],
        photo: curGoods.previewImage.path,
        secondPhoto: curGoods?.secondImage?.path || null,
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

  if (curGoods.isVisible === false)
    return {
      redirect: {
        destination: '/404',
        permanent: true,
      },
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
