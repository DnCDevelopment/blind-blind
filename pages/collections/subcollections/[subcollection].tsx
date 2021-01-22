import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import GoodsList, {
  GoodsListFallback,
} from '../../../src/components/Goods/GoodsList';
import { ICollectionPageProps } from '../../../src/pagesTypes';

const SubCollectionPage: NextPage<ICollectionPageProps> = () => {
  const { locale, defaultLocale, query } = useRouter();
  const isServer = typeof window === 'undefined';

  const subCollectionTitle =
    locale === defaultLocale ? query.name : query.name_en;

  return (
    <div className="subcollection-page">
      <div className="goods-container">
        {isServer ? (
          <GoodsList
            collectionName={subCollectionTitle as string}
            filter={`filter[subCollection._id]=${query.id as string}`}
          />
        ) : (
          <Suspense fallback={<GoodsListFallback />}>
            <GoodsList
              collectionName={subCollectionTitle as string}
              filter={`filter[subCollection._id]=${query.id as string}`}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default SubCollectionPage;
