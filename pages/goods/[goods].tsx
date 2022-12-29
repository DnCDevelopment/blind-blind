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
import { useEffect, useContext } from 'react';
import { ICurrencyContext } from '../../src/context/Types';
import { currencyContext } from '../../src/context/currencyContext';

const SingleGoodsPage: NextPage<IGoodsPageProps> = ({
  goodsProps,
  subCollection,
  locale,
}) => {
  const { USDRate, currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  useEffect(() => {
    if (goodsProps && typeof window !== 'undefined') {
      // const code = goodsProps.link?.replace('/', '') as string;
      const price = +goodsProps.price;
      fbq('track', 'ViewContent', {
        content_type: 'product',
        content_ids: goodsProps.id,
        currency: currency.toString() === 'UAH' ? 'USD' : currency.toString(),
        value:
          currency.toString() === 'UAH'
            ? price / USDRate
            : price / currencyRate,
      });
    }
  }, [goodsProps, USDRate, currency, currencyRate]);

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
      `remap/1.2/report/stock/all?filter=variant=https://online.moysklad.ru/api/remap/1.2/entity/variant/${id};quantityMode=all`
    );
  });
  const data = await Promise.all(stockPromises);

  const availableIdsObjects = data
    .map((item, idx) => {
      return Array.isArray(item.rows) &&
        item.rows.length &&
        item.rows[0].quantity >= 0
        ? { id: ids[idx], forOrder: item.rows[0].quantity === 0 }
        : false;
    })
    .filter((id) => id) as {
    [key: string]: string | boolean;
    id: string;
    forOrder: boolean;
  }[];

  const availableIds = availableIdsObjects.map(({ id }) => id);

  const sizes = moySkladGoods?.rows
    .filter(({ id }) => availableIds.includes(id))
    .map((row) => {
      const sizes = row.characteristics
        .filter((c) => c.name === 'Размер')
        .map((c) => c.value);
      const forOrder = availableIdsObjects.find(({ id }) => id === row.id)
        ?.forOrder;

      return sizes.length && { value: sizes[0], forOrder: forOrder };
    })
    .filter((size) => size) as {
    [key: string]: string | boolean;
    value: string;
    forOrder: boolean;
  }[];
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
  const orderedSizes = sizes
    .sort(
      ({ value: aValue }, { value: bValue }) =>
        sizeOrder.indexOf(bValue) - sizeOrder.indexOf(aValue)
    )
    .reverse();

  const keys = new Set();
  const uniqueSizes = orderedSizes.filter((record) => {
    const cols = Object.keys(record).sort();
    const key = cols.map((field) => record[field]).join('\x00');
    const has = keys.has(key);
    if (!has) keys.add(key);
    return !has;
  });

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
        sizes: uniqueSizes,
        photo: curGoods.previewImage.path,
        secondPhoto: curGoods?.secondImage?.path || null,
        otherPhotos: curGoods.otherImages,
        isExclusive: curGoods.isExclusive,
        collectionLink: curGoods.collection.link,
        collectionTitle: curGoods.collection.display,
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
        permanent: false,
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
