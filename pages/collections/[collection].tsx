import { NextPage, GetServerSideProps } from 'next';
import { Suspense } from 'react';

import Error from '../_error';

import { ICollectionPageProps } from '../../src/pagesTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';
import GoodsList, {
  GoodsListFallback,
} from '../../src/components/Goods/GoodsList';
import { useRouter } from 'next/router';
import SubCollections from '../../src/components/SubCollections/SubCollections';
import GoodsListTitle from '../../src/components/Goods/GoodsListTitle';

const CollectionPage: NextPage<ICollectionPageProps> = ({
  collection,
  subCollections,
}) => {
  const { locale, defaultLocale } = useRouter();

  if (!collection) return <Error />;

  const collectionName =
    locale === defaultLocale ? collection.title : collection.title_en;

  if (subCollections)
    return (
      <>
        <GoodsListTitle title={collectionName} />
        <SubCollections subCollections={subCollections} />
      </>
    );

  const isServer = typeof window === 'undefined';
  const { _id: collectionId } = collection;

  return (
    <div className="collection-page">
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
  const curCollection = collections.total > 0 ? collections.entries[0] : null;

  const subCollections = curCollection
    ? await getCockpitCollection(
        'SubCollections',
        'filter[collection._id]=' + curCollection._id
      )
    : null;
  const curSubCollections =
    subCollections.total > 0 ? subCollections.entries : null;

  return {
    props: {
      collection: curCollection,
      subCollections: curSubCollections,
    },
  };
};

export default CollectionPage;
