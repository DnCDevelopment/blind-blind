import { GetServerSideProps, NextPage } from 'next';

import Error from '../../_error';

import GoodsList from '../../../src/components/Goods/GoodsList';
import GoodsListTitle from '../../../src/components/Goods/GoodsListTitle';
import Seo from '../../../src/components/Seo/Seo';

import {
  ICockpitCategoriesEntries,
  ICockpitSubCollectionRaw,
} from '../../../src/cockpitTypes';
import { ISubCollectionPageProps } from '../../../src/pagesTypes';

import { getCockpitCollection } from '../../../src/utils/getCockpitData';

import {
  SEO_ITEMS,
  DEFAULT_DESCRIPTION,
} from '../../../src/constants/seoItems';
import { LANGUAGES } from '../../../src/constants/languages';
import { ICockpitGoodsEntries } from '../../../src/cockpitTypes';

const SubCollectionPage: NextPage<ISubCollectionPageProps> = ({
  subCollectionProps,
  locale,
  goods,
  categories,
}) => {
  if (!subCollectionProps) {
    return <Error />;
  }

  const { title, description, link } = subCollectionProps;

  const collectionLink =
    LANGUAGES[locale as 'ru' | 'en'].path +
    '/collections' +
    subCollectionProps.collection.link;
  const subCollectionLink =
    LANGUAGES[locale as 'ru' | 'en'].path +
    '/collections' +
    '/subcollections' +
    link;

  return (
    <div className="subcollection-page">
      <Seo
        title={title}
        description={description || DEFAULT_DESCRIPTION[locale]}
        breadcrumbs={[
          {
            title: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.breadcrumbName,
            link: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.link,
          },
          {
            title: subCollectionProps.collection.title,
            link: collectionLink,
          },
          {
            title: title,
            link: subCollectionLink,
          },
        ]}
        lang={locale as 'ru' | 'en'}
        path={process.env.NEXT_PUBLIC_SITE_URL + link}
      />
      <GoodsListTitle title={title} />
      <GoodsList goods={goods} categories={categories} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
  query: { subcollection },
}) => {
  const filter = 'filter[link]=/' + subcollection + '&populate=1';
  const subCollections = await getCockpitCollection('SubCollections', filter);
  const curSubCollection: ICockpitSubCollectionRaw = subCollections.total
    ? subCollections.entries[0]
    : null;

  const subCollectionProps = curSubCollection
    ? {
        id: curSubCollection._id,
        title:
          locale === defaultLocale
            ? curSubCollection.title
            : curSubCollection.title_en,
        description:
          locale === defaultLocale
            ? curSubCollection.description
            : curSubCollection.description_en,
        link:
          locale === defaultLocale
            ? curSubCollection.link
            : curSubCollection.link_en,
        collection: {
          link:
            locale === defaultLocale
              ? curSubCollection.collection.link
              : curSubCollection.collection.link_en,
          title:
            locale === defaultLocale
              ? curSubCollection.collection.title
              : curSubCollection.collection.title_en,
        },
      }
    : null;

  const cockpitCategoriesData: ICockpitCategoriesEntries =
    await getCockpitCollection('Categories');
  const goodsData: ICockpitGoodsEntries = await getCockpitCollection(
    'Goods',
    `filter[subCollection._id]=${curSubCollection._id}`
  );

  const goods = goodsData.entries.filter(
    ({ isVisible }) => isVisible !== false
  );

  const categories = cockpitCategoriesData.entries.map((category) => ({
    ...category,
    title: locale === defaultLocale ? category.title : category.title_en,
  }));

  return {
    props: {
      subCollectionProps,
      locale,
      categories,
      goods: {
        entries: goods,
      },
    },
  };
};

export default SubCollectionPage;
