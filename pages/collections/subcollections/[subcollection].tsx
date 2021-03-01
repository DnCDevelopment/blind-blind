import { GetServerSideProps, NextPage } from 'next';
import { Suspense } from 'react';

import Error from '../../_error';

import GoodsList, {
  GoodsListFallback,
} from '../../../src/components/Goods/GoodsList';
import GoodsListTitle from '../../../src/components/Goods/GoodsListTitle';
import Seo from '../../../src/components/Seo/Seo';

import { ICockpitSubCollectionRaw } from '../../../src/cockpitTypes';
import { ISubCollectionPageProps } from '../../../src/pagesTypes';

import { getCockpitCollection } from '../../../src/utils/getCockpitData';

import {
  SEO_ITEMS,
  DEFAULT_DESCRIPTION,
} from '../../../src/constants/seoItems';

const SubCollectionPage: NextPage<ISubCollectionPageProps> = ({
  subCollectionProps,
  locale,
}) => {
  if (!subCollectionProps) {
    return <Error />;
  }

  const { title, id, description, link } = subCollectionProps;
  const isServer = typeof window === 'undefined';

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
            link: subCollectionProps.collection.link,
          },
          {
            title: title,
            link: link,
          },
        ]}
        lang={locale as 'ru' | 'en'}
        path={link}
      />
      <GoodsListTitle title={title} />
      {isServer ? (
        <GoodsList filter={`filter[subCollection._id]=${id as string}`} />
      ) : (
        <Suspense fallback={<GoodsListFallback />}>
          <GoodsList filter={`filter[subCollection._id]=${id as string}`} />
        </Suspense>
      )}
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

  return {
    props: {
      subCollectionProps,
      locale,
    },
  };
};

export default SubCollectionPage;
