import { NextPage, GetServerSideProps } from 'next';
import { Suspense } from 'react';

import Error from '../_error';

import { ICollectionPageProps } from '../../src/pagesTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';
import GoodsList, {
  GoodsListFallback,
} from '../../src/components/Goods/GoodsList';
import { useRouter } from 'next/router';

const CollectionPage: NextPage<ICollectionPageProps> = ({ collection }) => {
  const { locale, defaultLocale } = useRouter();

  if (!collection) return <Error />;

  const isServer = typeof window === 'undefined';
  const { _id: collectionId } = collection;
  const collectionName =
    locale === defaultLocale ? collection.title : collection.title_en;

  return (
    <div className="collection-page">
      <div className="goods-container">
        {isServer ? (
          <GoodsList
            collectionName={collectionName}
            collectionId={collectionId as string}
          />
        ) : (
          <Suspense fallback={<GoodsListFallback />}>
            <GoodsList
              collectionName={collectionName}
              collectionId={collectionId as string}
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

  const cur_collection =
    collections.entries.length > 0 ? collections.entries[0] : null;

  return {
    props: {
      collection: cur_collection,
    },
  };
};

export default CollectionPage;
