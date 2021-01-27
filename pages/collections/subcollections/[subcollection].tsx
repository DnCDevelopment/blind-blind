import { GetServerSideProps, NextPage } from 'next';
import { Suspense } from 'react';
import { ICockpitSubCollectionRaw } from '../../../src/cockpitTypes';
import GoodsList, {
  GoodsListFallback,
} from '../../../src/components/Goods/GoodsList';
import GoodsListTitle from '../../../src/components/Goods/GoodsListTitle';
import { ISubCollectionPageProps } from '../../../src/pagesTypes';
import { getCockpitCollection } from '../../../src/utils/getCockpitData';
import Error from '../../_error';

const SubCollectionPage: NextPage<ISubCollectionPageProps> = ({
  subCollectionProps,
}) => {
  if (!subCollectionProps) {
    return <Error />;
  }

  const { title, id } = subCollectionProps;
  const isServer = typeof window === 'undefined';

  return (
    <div className="subcollection-page">
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
  const filter = 'filter[link]=/' + subcollection;
  const subCollections = await getCockpitCollection('SubCollections', filter);
  const curSubCollection: ICockpitSubCollectionRaw =
    subCollections.total > 0 ? subCollections.entries[0] : null;

  const subCollectionProps = curSubCollection
    ? {
        id: curSubCollection._id,
        title:
          locale === defaultLocale
            ? curSubCollection.title
            : curSubCollection.title_en,
      }
    : null;

  return {
    props: { subCollectionProps },
  };
};

export default SubCollectionPage;
