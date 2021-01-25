import { NextPage } from 'next';
import { Suspense } from 'react';
import GoodsList, {
  GoodsListFallback,
} from '../src/components/Goods/GoodsList';
import GoodsListTitle from '../src/components/Goods/GoodsListTitle';

const SalesPage: NextPage = () => {
  const isServer = typeof window === 'undefined';
  return (
    <div className="sales-apge">
      <GoodsListTitle />
      <div className="goods-container">
        {isServer ? (
          <GoodsList filter={`filter[stockPrice][$exists]=true`} />
        ) : (
          <Suspense fallback={<GoodsListFallback />}>
            <GoodsList filter={`filter[stockPrice][$exists]=true`} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
