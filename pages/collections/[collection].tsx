import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';

import Error from '../_error';
import GoodsList, {
  GoodsListFallback,
} from '../../src/components/Goods/GoodsList';
import GoodsListTitle from '../../src/components/Goods/GoodsListTitle';
import Seo from '../../src/components/Seo/Seo';
import SubCollections from '../../src/components/SubCollections/SubCollections';

import { ICollectionPageProps } from '../../src/pagesTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

import { SEO_ITEMS, DEFAULT_DESCRIPTION } from '../../src/constants/seoItems';

const CollectionPage: NextPage<ICollectionPageProps> = ({
  collection,
  subCollections,
}) => {
  const { locale, defaultLocale } = useRouter();

  if (!collection) return <Error />;

  const collectionDescription =
    locale === defaultLocale
      ? collection.description
      : collection.description_en;
  const collectionLink =
    locale === defaultLocale ? collection.link : collection.link_en;
  const collectionName =
    locale === defaultLocale ? collection.title : collection.title_en;

  if (subCollections)
    return (
      <>
        <Seo
          title={collectionName}
          description={
            collectionDescription || DEFAULT_DESCRIPTION[locale as 'ru' | 'en']
          }
          breadcrumbs={[
            {
              title: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.breadcrumbName,
              link: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.link,
            },
            {
              title: collectionName,
              link: collectionLink,
            },
          ]}
          lang={locale as 'ru' | 'en'}
          path={collectionLink}
        />
        <GoodsListTitle title={collectionName} />
        <SubCollections subCollections={subCollections} />
      </>
    );

  const isServer = typeof window === 'undefined';
  const { _id: collectionId } = collection;

  return (
    <div className="collection-page">
      <Seo
        title={collectionName}
        description={
          collectionDescription || DEFAULT_DESCRIPTION[locale as 'ru' | 'en']
        }
        breadcrumbs={[
          {
            title: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.breadcrumbName,
            link: SEO_ITEMS[locale as 'ru' | 'en'].indexPage.link,
          },
          {
            title: collectionName,
            link: collectionLink,
          },
        ]}
        lang={locale as 'ru' | 'en'}
        path={collectionLink}
      />
      <GoodsListTitle title={collectionName} />
      <div className="goods-container">
        {isServer ? (
          <GoodsList
            filter={`filter[collection._id]=${collectionId as string}`}
          />
        ) : (
          <Suspense fallback={<GoodsListFallback />}>
            <GoodsList
              filter={`filter[collection._id]=${collectionId as string}`}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { collection },
}) => {
  const collections = await getCockpitCollection(
    'Collections',
    'filter[link]=/' + collection
  );
  const curCollection = collections.total ? collections.entries[0] : null;

  const subCollections = curCollection
    ? await getCockpitCollection(
        'SubCollections',
        'filter[collection._id]=' + curCollection._id
      )
    : null;
  const curSubCollections = subCollections?.total
    ? subCollections.entries
    : null;

  return {
    props: {
      collection: curCollection,
      subCollections: curSubCollections,
    },
  };
};

export default CollectionPage;
